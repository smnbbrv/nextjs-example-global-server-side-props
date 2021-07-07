# Example of handling global app logic with next.js

## Why

Current implementation of next.js does not allow to have serverSideProps for _app, see e.g. https://github.com/vercel/next.js/discussions/10874

However, it is mostly a common need to

- set and check cookies on every page call
- differently setup the pages depending on the server side data
- specify global providers (e.g. react-intl), providing them with the common data etc.

This approach gives a way better option. It provides a common way of dealing with the issues above and meanwhile could be configured on a per-page basis.

## Running the project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## What and how

The directory `page` contains two files: 

- `page.tsx` that implements the global page logic on the client side (kinda custom _app.ts)
- `server-side-props.tsx` that implements the getServerSideProps for the `page.tsx`

Then, every page can be constructed as e.g.

```ts
export interface HomePageProps extends PageProps {
  // the props for this specific page
}

export const getServerSideProps = createServerSideProps<HomePageProps>(async ({ props, data }) => {
  // here goes custom SSR logic for this page

  return {
    props,
  };
});


const HomePage: FunctionComponent<HomePageProps> = Page(props => {
  return (...)
});

export default HomePage;
```

or if no custom SSR logic required simply

```ts
export const getServerSideProps = createServerSideProps<PageProps>();

const HomePage: FunctionComponent<PageProps> = Page(props => {
  return (...)
});

export default HomePage;
```

Please check the comments in the files to see how it works.

The application can easily have more than one `page.tsx` implementation, and one is able to decide which implementation to use on the particular page.

## License

MIT
