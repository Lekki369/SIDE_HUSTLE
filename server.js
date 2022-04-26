// GROUP 51 CAPSTONE NODE.JS
const http = require("http");
const os = require("os");
const fs = require("fs");
const fileName = "./osfile.json";
const host = "127.0.0.1";
const port = 3020;

const host_platform = os.platform();
const arch_type = os.arch();
const no_of_core = os.cpus().length;
const os_upTime = os.uptime();
const host_name = os.hostname();
const network_Inter = os.networkInterfaces();

const serializedData = JSON.stringify(
  {
    hostname: host_name,
    platform: host_platform,
    architecture: arch_type,
    number_of_cores: no_of_core,
    uptime: os_upTime,
    network_Interfaces: network_Inter,
  },
  null,
  2
);

const server = http.createServer((req, res) => {
  const urlPath = req.url;

  if (urlPath == "/" || urlPath == "/home") {
    res.statusCode = 200;
    res.setHeader("content-Type", "text/html");
    fs.createReadStream("./pages/index.html").pipe(res);
  } 
  else if (urlPath == "/about") {
    res.statusCode = 200;
    res.setHeader("content-Type", "text/html");
    fs.createReadStream("./pages/about.html").pipe(res);
  } 
  else if (urlPath == "/sys") {
    res.statusCode = 201;
    res.setHeader("content-Type", "application/json");
    res.write("Your OS Info has been saved successfully!");
    res.end();
    fs.writeFile(fileName, serializedData, (err) => {
      if (err) return console.log(err);
    });
  }
   else {
    res.statusCode = 404;
    res.setHeader = { "content-Type": "text/html" };
    fs.createReadStream("./pages/404.html").pipe(res);
  }
});
server.listen(port, host, () => {
  console.log(`server is running at ${host}:${port}`);
});
