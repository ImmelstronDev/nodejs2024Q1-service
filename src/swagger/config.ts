import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

import { parse } from 'yamljs';

const getSwaggerConf = async () => {
  const docPath = resolve(__dirname, '../../doc/api.yaml');
  const rs = await readFile(docPath, 'utf-8');
  return parse(rs);
};

export const setupSwaggerConf = async (app: INestApplication) => {
  const config = await getSwaggerConf();
  SwaggerModule.setup('doc', app, config);
};
