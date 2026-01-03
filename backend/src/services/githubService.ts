import { GraphQLClient, gql } from 'graphql-request';
import dotenv from 'dotenv';

dotenv.config();

const GITHUB_ENDPOINT = 'https://api.github.com/graphql';

const client = new GraphQLClient(GITHUB_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});

// 1. Query for Regular Users (Includes Contribution Graph)
const GET_USER_DATA = gql`
  query getUserData($username: String!) {
    user(login: $username) {
      name
      login
      avatarUrl
      bio
      location
      email
      websiteUrl
      twitterUsername
      followers { totalCount }
      following { totalCount }
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            stargazerCount
            primaryLanguage { name color }
            url
          }
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              color
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

// 2. Query for Organizations (No Contributions, different Followers field)
const GET_ORG_DATA = gql`
  query getOrgData($username: String!) {
    organization(login: $username) {
      name
      login
      avatarUrl
      bio: description
      location
      email
      websiteUrl
      twitterUsername
      membersWithRole { totalCount } # Orgs use 'members' instead of followers
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            stargazerCount
            primaryLanguage { name color }
            url
          }
        }
      }
    }
  }
`;

export const fetchGitHubProfile = async (username: string) => {
  try {
    // ATTEMPT 1: Try to fetch as a USER
    // We expect this to throw an error or return null if it's an Organization
    try {
      const userData: any = await client.request(GET_USER_DATA, { username });
      if (userData.user) {
        return userData.user;
      }
    } catch (err) {
      // Ignore error here and proceed to try Organization
      // GraphQL often throws an error if the type doesn't match
    }

    console.log(`User '${username}' not found or type mismatch. Trying as Organization...`);

    // ATTEMPT 2: Try to fetch as an ORGANIZATION
    const orgData: any = await client.request(GET_ORG_DATA, { username });
    
    if (orgData.organization) {
      // Map the Org data to look like a User so the Frontend doesn't break
      return {
        ...orgData.organization,
        followers: { totalCount: orgData.organization.membersWithRole?.totalCount || 0 },
        following: { totalCount: 0 },
        contributionsCollection: null // Orgs don't have the graph
      };
    }

    // If we reach here, neither was found
    return null;

  } catch (error) {
    console.error('GitHub API Service Error:', error);
    throw error;
  }
};