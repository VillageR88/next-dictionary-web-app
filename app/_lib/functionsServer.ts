'use server';
import { Word, ErrorWord } from './interfaces';

export async function CreateInvoice(
  prev: { number: number; search: string; jsonData: Word[] | ErrorWord },
  formData: FormData,
): Promise<{ number: number; search: string; jsonData: Word[] | ErrorWord }> {
  const search = formData.get('search') as string;
  let jsonData;
  const safeSearch = (search: string) => search.replace(/[^a-zA-Z]/g, '');
  return await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${safeSearch(search)}`)
    .then((res) => res.json())
    .then((data) => {
      jsonData = data as Word[] | ErrorWord;
      return { number: prev.number + 1, search: search, jsonData: jsonData };
    });
}
