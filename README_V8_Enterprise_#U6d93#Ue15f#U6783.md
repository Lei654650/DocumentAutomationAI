# Document Automation AI V8 Enterprise

## 日常启动

双击 `Start_All.bat`。

默认管理员密码：`admin123456`

## 启用 OCR

在 Windows 安装 Tesseract OCR，并将其加入 PATH。重新启动软件后，`/api/health` 会显示 OCR 可用。

## 启用 AI 翻译

编辑 `backend/.env`：

```env
TRANSLATION_PROVIDER=openai
OPENAI_API_KEY=你的密钥
```

或：

```env
TRANSLATION_PROVIDER=deepseek
DEEPSEEK_API_KEY=你的密钥
```

当前版本已完成 Provider 配置检测、任务队列和工作流阻塞管理。API 密钥缺失时不会产生假翻译文件。
