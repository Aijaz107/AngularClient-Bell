/**
 * User model interface
 *
 * Represents the shape of a user object as used throughout the application.
 * Keep this interface lightweight — form payloads use FormData when uploading
 * images while API responses map to this shape.
 */
export interface User {
  /** Unique identifier for the user */
  id: number;

  /** First name (display and input) */
  first_name: string;

  /** Last name (display and input) */
  last_name: string;

  /** Email address (used for login/identification) */
  email: string;

  /** Password (not recommended to keep plain text in real apps) */
  password: string;

  /**
   * Optional user image. Components typically receive a URL from the API,
   * but during create/update flows the image can be a File.
   */
  image: File | null;

}