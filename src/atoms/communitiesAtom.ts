import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
    id: string;
    privacyType: 'public' | 'restricted' | 'private';
    numberOfMembers:number;
    creatorId: string;
    imageURL: string;
}