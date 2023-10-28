import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import configuration from './configuration';

@Injectable()
export class CustomConfigService {
  constructor(
    @Inject(configuration.KEY)
    private readonly configs: ConfigType<typeof configuration>,
  ) {}

  get host(): string {
    return this.configs.db_host;
  }

  get port(): number {
    return this.configs.db_post;
  }

  get username(): string {
    return this.configs.db_username;
  }

  get password(): string {
    return this.configs.db_password;
  }

  get db(): string {
    return this.configs.db_database;
  }
}
