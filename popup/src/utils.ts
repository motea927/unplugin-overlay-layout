export function deepEqual(obj1: any, obj2: any, excludeProps: string[] = []): boolean {
  // Check if both objects are of the same type
  if (typeof obj1 !== typeof obj2) {
    return false
  }

  // Check if both objects are primitive types or null
  if (obj1 == null || obj2 == null || typeof obj1 !== 'object') {
    return obj1 === obj2
  }

  // Get the keys of the objects
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false
  }

  // Iterate through the keys and recursively compare the values
  for (const key of keys1) {
    // Check if the current key should be excluded
    if (excludeProps.includes(key)) {
      continue
    }

    if (!deepEqual(obj1[key], obj2[key], excludeProps)) {
      return false
    }
  }

  // If all comparisons passed, the objects are deep equal
  return true
}
