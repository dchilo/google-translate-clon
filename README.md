
# Google Translate Clon with NextJS and TS

My first project, it is a Google Translate Clon powered by OpenAI API, made with NextJS, Tailwind and TypeScript. A little of validations with Zod.


## Screenshots

![App Screenshot](https://i.imgur.com/7qgZ7KS.png)


## Deployment

To deploy this project run

```bash
  npx next dev
  # or
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
```
Open http://localhost:3000 with your browser to see the result

## API Reference

#### Get all items

```http
  POST /api/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fromLanguage` | `string` | **Required**. The Language code as 'en' |
| `toLanguage` | `string` | **Required**. The Language code as 'es' |
| `text` | `string` | **Required**. The text to translate |

#### Get item



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`OPENAI_API_KEY`



## Authors

- [@dchilo](https://github.com/dchilo)


## Feedback

If you have any feedback, please reach out to us at dchilo22@gmail.com
