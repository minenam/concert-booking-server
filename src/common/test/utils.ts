export const generateMockFromClass = <
  T extends new (...arguments_: any[]) => InstanceType<T>,
>(
  mockClass: T,
): InstanceType<T> => {
  // Create an instance of the class without calling the constructor
  const prototype = mockClass.prototype;
  const mock: InstanceType<T> = Object.create(prototype);

  // Create a Set to keep track of all keys from the prototype chain
  const allKeys = new Set<string>();

  // Traverse the prototype chain
  let currentPrototype = prototype;
  while (currentPrototype && currentPrototype !== Object.prototype) {
    // Get all property names from the current prototype
    for (const key of Object.getOwnPropertyNames(currentPrototype))
      allKeys.add(key);
    // Move up the prototype chain
    currentPrototype = Object.getPrototypeOf(currentPrototype);
  }

  // Add own keys of the mock object
  for (const key of Object.keys(mock)) allKeys.add(key);

  // Mock all methods
  for (const key of allKeys) {
    if (typeof mock[key] === 'function') {
      mock[key] = jest.fn();
    }
  }

  return mock;
};
