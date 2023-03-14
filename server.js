var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

// 서버 생성
http.createServer(function(req, res) {

    "use strict";

    // 요청된 URI 정보
    var uri = url.parse(req.url).pathname;
    // 서버 실행 경로와 URI를 합하여 전체 경로 생성
    var filename = path.join(process.cwd(), uri);
    // 디렉토리인지 확인하여 디렉토리이면 기본 페이지인 index.html으로 대체함
    fs.stat(filename, function(err, stats) {
        if( err ) {
            res.writeHeader(404, {"content-Type":"text/plan"});
            res.write("404 Not Found\n");
            res.end();
            return;
        }
        if( stats.isDirectory() ) {
            filename += "/index.html";
        }
    });

    fs.exists(filename, function(exists) {
        // 파일이 존재 하지 않을 경우 404
        if( !exists ) {
           // res.writeHeader(404, {"content-Type":"text/plan"});
            //res.write("404 Not Found\n");
            //res.end();
            return;
        }
        // 파일 읽다가 오류면 500
        fs.readFile(filename, "binary", function (err, file) {
            if( err ) {
                res.writeHeader(500, {"content-Type":"text/plan"});
                res.write(err + "\n");
                res.end();
                return;
            }
            // 확장자별 mimetype
            var ext = path.extname(filename);
            var mimetype = "text/plan";
            switch( ext ) {
                case ".html":
                case ".htm": mimetype = "text/html"; break;
                case ".css": mimetype = "text/css"; break;
                case ".js": mimetype = "text/javascript"; break;
                case ".jpg": mimetype = "image/jpeg"; break;
                case ".gif": mimetype = "image/gif"; break;
                case ".png": mimetype = "image/png"; break;
                case ".svg": mimetype = "image/svg+xml"; break;
                case ".svgz": mimetype = "image/svg+xml"; break;
                case ".mp4": mimetype = "video/mp4"; break;
            }
            res.writeHeader(200, {"content-Type": mimetype});
            res.write(file, "binary");
            res.end();
        });
    });
}).listen(9669);