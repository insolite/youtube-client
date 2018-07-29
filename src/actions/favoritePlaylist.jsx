const UPDATE_FAVORITE_PLAYLIST = 'UPDATE_FAVORITE_PLAYLIST';

export const updateFavoritePlaylist = (playlistId) => ({
    type: UPDATE_FAVORITE_PLAYLIST,
    payload: {
        playlistId,
    }
});

export const ACTIONS = {
    UPDATE_FAVORITE_PLAYLIST,
};
