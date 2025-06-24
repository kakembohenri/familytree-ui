/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

export function filterParams(params: any) {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) =>
        value !== null && value !== "" && value !== undefined && value !== 0
    )
  );
}
