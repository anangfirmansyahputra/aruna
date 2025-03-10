export function checkPermission(
  permissions: string[],
  permission: string
): boolean {
  return permissions.includes(permission) ? true : false
}
