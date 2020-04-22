import { types, ProfileAction, UserProfile } from '../Types/profile';

export function updateProfileUser(userProfile: UserProfile): ProfileAction {
    return {
        type: types.PROFILE_UPDATE_REQUEST,
        payload: userProfile
    }
}