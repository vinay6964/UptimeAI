import { Request, Response } from 'express';
import { fetchGitHubProfile } from '../services/githubService';

export const getProfile = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const data = await fetchGitHubProfile(username);
    
    if (!data) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};