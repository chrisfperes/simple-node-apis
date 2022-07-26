import Handlebars from 'handlebars';
import fs from 'fs';

interface IParseMailTemplate {
  file: string;
  variables: { [key: string]: string | number };
}

export default class HandlebarsMailTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = Handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}
