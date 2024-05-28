export function helloWorld(): string {
  return "Hello World!";
}

test('Hello World!', () => {
  expect(helloWorld()).toBe("Hello World!");
});