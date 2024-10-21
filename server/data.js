import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Dirname sets the path upto your current directory /fullstack/mern/server
const fullPath = path.join(__dirname, 'views', 'app.ejs');
console.log(fullPath);  //  C:\FullStack\Mern\Server\views\app.ejs




// Converts a relative path into an absolute path based on the current working directory.
const absolutePath = path.resolve('Config/db.js');
console.log(absolutePath);  // C:\FullStack\Mern\Server\Config\db.js



// Retrieves the last part of a path, typically the file name.
const fileName = path.basename('/public/form.html'); // 'file.txt'
console.log(fileName);  // C:\FullStack\Mern\Server\Config\db.js





const dirName = path.dirname('/folder/file.txt'); // '/folder'
console.log(dirName);  