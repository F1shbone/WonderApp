let isRegistered = false;

export default function ({ store }) {
  console.log('register?', isRegistered);
  if (!isRegistered) {
    console.log('registered!');
    store.$subscribe(() => {
      // react to store changes
      console.log('change', store);
    });
    isRegistered = true;
  }
}
