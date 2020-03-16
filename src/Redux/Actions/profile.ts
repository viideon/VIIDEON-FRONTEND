import {types, ProfileAction, UserProfile} from '../Types/profile';

export function profileUser(userProfile:UserProfile): ProfileAction {
    return {
        type:types.PROFILE_REQUEST,
        payload:userProfile
    }
}