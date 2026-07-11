import { apiClient } from "./client";
import type { Profile, Project, Experience, Education } from "../types";

export const getProfile = (): Promise<Profile> => apiClient("profile/");
export const getProjects = (): Promise<Project[]> => apiClient("projects/");
export const getExperiences = (): Promise<Experience[]> => apiClient("experience/");
export const getEducation = (): Promise<Education[]> => apiClient("education/");
