/*****************************************************************************************************************/

// @author         Michael Roberts
// @package        @koroutine/web
// @license        Copyright © 2024

/*****************************************************************************************************************/

// This accurately describes the data structure from the API:
export type URLNode = {
  url: string;
  links?: URLNode[];
};

/*****************************************************************************************************************/

// But how can we be sure that the data we receive from the API is valid?
// This assertion function will throw an error if the data is invalid:
export const isURLNode = (value: unknown): value is URLNode => {
  if (
    !(
      value &&
      typeof value === "object" &&
      "url" in value &&
      typeof value.url === "string"
    )
  ) {
    throw new Error("Invalid URLNode");
  }

  return true;
};

/*****************************************************************************************************************/
