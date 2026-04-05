import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Step {
    moduleId: bigint;
    completed: boolean;
    stepNumber: bigint;
}
export interface UserProgress {
    badges: Array<Badge>;
    steps: Array<Step>;
}
export interface Badge {
    name: string;
    description: string;
    earned: boolean;
}
export interface backendInterface {
    getBadges(): Promise<Array<Badge>>;
    getProgress(): Promise<UserProgress>;
    markStepComplete(moduleId: bigint, stepNumber: bigint): Promise<void>;
}
