# Document Automation AI V10 Cloud Enterprise

## 云端结构
V10 将 React 前端和 FastAPI 后端打包为同一个 Docker 服务。客户和管理员使用同一个 HTTPS 域名，浏览器不再访问 127.0.0.1。

## 数据持久化
首个云端版本使用 SQLite + 云端持久化磁盘，适合单实例上线测试和初期接单。必须把持久化卷挂载到 `/data`，否则服务器重启后订单和文件会丢失。

持久化内容：
- `/data/data/orders.db`
- `/data/data/ai_settings.json`
- `/data/uploads`
- `/data/outputs`

## Railway 部署
1. 把完整工程上传到 GitHub 私有仓库。
2. Railway 新建项目，选择 Deploy from GitHub Repo。
3. Railway 会读取根目录 `Dockerfile` 和 `railway.json`。
4. 在 Variables 添加：
   - `ADMIN_PASSWORD`：强密码
   - `CLOUD_MODE=true`
   - `APP_DATA_DIR=/data`
   - `MAX_FILE_SIZE_MB=100`
   - AI 服务商相关变量（可选）
5. 在 Railway 服务中增加 Volume，挂载路径填写 `/data`。
6. Generate Domain，得到公网 HTTPS 地址。
7. 把 `PUBLIC_BASE_URL` 和 `CORS_ORIGINS` 都设置为生成的 HTTPS 地址，然后重新部署。

## 本地 Docker 验证
复制环境变量后运行：

```bash
docker compose -f docker-compose.cloud.yml up --build
```

浏览器打开：`http://localhost:8080`

## 安全要求
- 云端绝对不要使用默认管理员密码 `admin123456`。
- API Key 只放在云端环境变量或管理员设置中，不要提交到 GitHub。
- GitHub 仓库建议设为 Private。
- 正式业务前应增加对象存储、PostgreSQL、独立任务队列和客户登录。

## 当前云端边界
V10 Cloud 支持单实例运行。SQLite 依赖持久化卷，不适合同时启动多个后端副本。后续大规模并发版本再迁移 PostgreSQL + Redis/Celery。
