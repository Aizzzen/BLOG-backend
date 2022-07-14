import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'

@Injectable()
export class FilesService {

    async createFile(file): Promise<string> {
        try {
            // название файла
            const fileName = uuid.v4() + '.jpg'
            // путь к файлу
            const filePath = path.resolve(__dirname, '..', 'static')
            // если по этому пути ничего не сушщ. созадем папку
            if(!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            // записываем файл в папку
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
