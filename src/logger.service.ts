import { Injectable, LoggerService, Scope } from '@nestjs/common';
import chalk from 'chalk';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerGo implements LoggerService {
  log(message: string,  trace: string) {
    console.log(`${chalk.green("[LoggerGo]")} --- ${chalk.green.greenBright(message)}\nTime : ${new Date().toISOString()}`);
  }

  error(message: string, trace: string) {
    console.error(`${chalk.red("[LoggerGo]")} --- ${chalk.green.redBright(message)}\nTime : ${new Date().toISOString()}`,trace);
  }

  warn(message: string) {
    console.warn(`${chalk.yellow("[LoggerGo]")} --- ${chalk.green.yellowBright(message)}\nTime : ${new Date().toISOString()}`);
  }

  debug(message: string) {
    console.debug(`${chalk.yellow("[LoggerGo]")} --- ${chalk.green.yellowBright(message)}\nTime : ${new Date().toISOString()}`);
  }

  verbose(message: string) {
    console.info(`${chalk.blue("[LoggerGo]")} --- ${chalk.green.blueBright(message)}\nTime : ${new Date().toISOString()}`);
  }
}
