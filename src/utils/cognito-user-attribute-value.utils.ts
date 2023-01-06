import { AttributeListType } from "aws-sdk/clients/cognitoidentityserviceprovider";

/**
 *
 * @param cognitoUserAttributes
 * @param attribute
 * @returns string
 */
export default function cognitoUserAttributeValue(
  cognitoUserAttributes: AttributeListType | undefined,
  attribute: string
): string {
  return !!cognitoUserAttributes
    ? (cognitoUserAttributes.find((attr) => attr.Name === attribute)
        ?.Value as string)
    : "";
}
