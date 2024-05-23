import { helloWorld } from './hello-world';

test('Hello World!', () => {
  expect(helloWorld()).toBe("Hello World!");
});