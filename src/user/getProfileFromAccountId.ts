import type {
  AllCallOptions,
  AuthorizationPayload,
  ProfileFromAccountIdResponse
} from "../models";
import { buildRequestUrl } from "../utils/buildRequestUrl";
import { call } from "../utils/call";
import { USER_BASE_URL } from "./USER_BASE_URL";

type GetProfileFromAccountIdOptions = Pick<AllCallOptions, "headerOverrides">;

/**
 * A call to this function will retrieve the profile of the username being requested.
 * If the user cannot be found (either due to non-existence or privacy settings),
 * an error will be thrown.
 *
 * This is a legacy API endpoint function. If you are just trying to get a user's
 * account ID, [`makeUniversalSearch()`](https://psn-api.achievements.app/api-docs/universal-search#makeuniversalsearch)
 * is recommended instead. This endpoint is here because it can return interesting
 * presence information when the user is playing on a legacy console such as a PS3.
 *
 * @param authorization An object containing your access token, typically retrieved with `exchangeCodeForAccessToken()`.
 * @param accountId The accountId for the user you wish to retrieve a profile for.
 */
export const getProfileFromAccountId = async (
  authorization: AuthorizationPayload,
  accountId: string,
  options?: GetProfileFromAccountIdOptions
): Promise<ProfileFromAccountIdResponse> => {
  const url = buildRequestUrl(USER_BASE_URL, "/:accountId/profiles", options, {
    accountId
  });
  const response = await call<ProfileFromAccountIdResponse>(
    { url },
    authorization
  );

  if ((response as any)?.error) {
    throw new Error((response as any)?.error?.message ?? "Unexpected Error");
  }

  return response;
};
