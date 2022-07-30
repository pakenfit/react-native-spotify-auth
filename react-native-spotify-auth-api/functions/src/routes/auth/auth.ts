import { Response, Request } from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import { randomBytes } from 'crypto';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.CALLBACK_URL,
});

export const authorize = async (req: Request, res: Response) => {
  const state: string = randomBytes(30).toString('hex');
  const scope =
    'user-read-private user-read-email user-read-currently-playing user-library-read playlist-read-private user-top-read user-read-playback-state user-read-recently-played user-read-playback-position user-modify-playback-state';
  res.redirect(
    'https://accounts.spotify.com/authorize?response_type=code&client_id=' +
      process.env.CLIENT_ID +
      '&scope=' +
      scope +
      '&redirect_uri=' +
      process.env.CALLBACK_URL +
      '&state=' +
      state,
  );
};

export const getToken = async (req: Request, res: Response) => {
  const { code } = req.query || {};

  try {
    const authorized = await spotifyApi.authorizationCodeGrant(code as string);
    spotifyApi.setRefreshToken(authorized.body.refresh_token);
    return res.redirect(
      `${process.env.APP_DEEP_LINK}/${JSON.stringify(authorized.body)}`,
    );
  } catch (error) {
    return res.redirect(
      `${process.env.APP_DEEP_LINK}/${JSON.stringify(error)}`,
    );
  }
};

export const getRefreshedToken = async (req: Request, res: Response) => {
  try {
    const { refresh_token } = req.body || {};
    spotifyApi.setRefreshToken(refresh_token);
    const response = await spotifyApi.refreshAccessToken();
    return res.json({ access_token: response.body.access_token });
  } catch (error) {
    return res.json(error);
  }
};
