import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft, ArrowRight, BadgeCheck, Building2, Check, Download, Eye, File,
  FileSpreadsheet, FileText, FolderOpen, Languages, ListChecks, LockKeyhole,
  Mail, RefreshCw, Play, ScanLine, Search, LogOut, FileDown, Send, ShieldCheck, Sparkles, UploadCloud,
  UserRound, X
} from 'lucide-react'
import './App.css'

const API_BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '')

const COPY = {
  zh: {
    nav: ['服务', '流程', '报价', '联系'],
    badge: 'AI 工业文档处理服务',
    title1: '上传文档，',
    title2: '我们负责专业交付。',
    intro: '支持 PDF、Excel、Word、图片和 ZIP。系统自动识别输入内容，并可同时选择多种输出格式。',
    upload: '开始上传文件',
    admin: '订单后台',
    trust: '人工复核 · 文件保密 · 中英越支持',
    wizardTitle: '提交文档处理订单',
    stepFiles: '上传文件',
    stepCustomer: '客户资料',
    stepService: '选择服务',
    stepConfirm: '确认提交',
    next: '下一步',
    previous: '上一步',
    submit: '提交订单',
    selectFiles: '点击选择文件或拖拽文件到这里',
    filesHint: '支持 PDF、Excel、Word、图片和 ZIP，单个文件最大 100 MB',
    noFiles: '请至少选择一个文件。',
    name: '姓名',
    company: '公司（可选）',
    email: '邮箱',
    whatsapp: 'WhatsApp / 电话（可选）',
    country: '国家或地区',
    deadline: '期望完成时间',
    requirements: '项目要求',
    orderSuccess: '订单提交成功',
    orderNumber: '订单编号',
    successDesc: '文件和订单资料已经保存。你可以进入后台查看。',
    createAnother: '再提交一个订单',
    viewAdmin: '打开订单后台',
    adminTitle: '管理后台 · 订单列表',
    refresh: '刷新',
    backHome: '返回首页',
    emptyOrders: '暂无订单。',
    status: '状态',
    customer: '客户',
    services: '服务',
    created: '创建时间',
    files: '文件',
    detail: '查看详情',
    quote: '报价管理',
    adminNote: '管理员备注',
    save: '保存修改',
    uploadResult: '上传交付文件',
    outputs: '交付文件',
    deleteOrder: '删除订单',
    deleteConfirm: '确定删除这个订单和相关文件吗？',
    totalOrders: '全部订单',
    completed: '已完成',
    processing: '处理中',
    waitingQuote: '等待报价',
    searchOrders:'搜索订单号、客户、邮箱或公司', allStatuses:'全部状态', exportOrders:'导出订单 CSV', logout:'退出后台', noMatchOrders:'没有符合条件的订单。',
    brandSubtitle: '专业文档服务', workflowTitle:'订单流程', realData:'真实数据', customerUploads:'客户上传文件',
    uploadStep:'上传', filesSaved:'文件已保存', customerStep:'客户', contactDetails:'联系方式', orderStep:'订单', sqliteRecord:'SQLite 记录',
    adminStep:'后台', reviewQuote:'审核与报价', orderCreated:'订单创建成功', visibleDashboard:'可在后台查看', ready:'已就绪',
    proofUploadTitle:'真实文件上传', proofUploadDesc:'通过 FastAPI 接收多文件上传', proofOrdersTitle:'SQLite 订单', proofOrdersDesc:'本地持久化订单数据库',
    proofAdminTitle:'管理后台', proofAdminDesc:'查看客户、服务和文件', proofDownloadTitle:'文件下载', proofDownloadDesc:'下载客户上传的原始文件',
    servicesLabel:'服务', servicesTitle:'一笔订单可以包含多项服务', servicesDesc:'提交前准确选择客户需要的处理内容。',
    businessLabel:'业务流程', businessTitle:'从客户上传到管理后台的完整路径',
    businessSteps:[['上传','客户发送一个或多个文件。'],['资料','填写姓名、邮箱、公司和完成时间。'],['服务','选择 OCR、翻译、转换或人工复核。'],['提交','文件和订单由 FastAPI 保存。'],['后台','管理员查看并下载客户文件。']],
    storageTitle:'本地开发存储', storageDesc:'测试期间文件保存在你的电脑上。', safeNamesTitle:'安全文件名', safeNamesDesc:'上传文件以唯一内部名称保存。',
    contactSavedTitle:'客户联系方式已保存', contactSavedDesc:'每笔订单都会保存邮箱和项目要求。', footerDesc:'V7 智能文档分析与订单平台', orderDashboard:'订单后台', backTop:'返回顶部 ↑',
    stepOutput:'输出与处理要求', requiredContact:'请填写姓名和电子邮箱。', chooseOutput:'请至少选择一种需要的输出格式。', sameLanguage:'原文语言和目标语言不能相同。', fillTarget:'请填写目标语言。', submitFailed:'订单提交失败。',
    detectedTitle:'已自动识别输入格式', imageScan:'图片 / 扫描件', zipArchive:'ZIP 压缩包', unknownFormat:'未知格式', exampleDeadline:'例如：2 个工作日', exampleRequirements:'例如：整理数据、保持原版式、翻译成中文、输出 Excel 和 PDF……',
    autoDetectTitle:'系统已自动识别输入格式', currentFiles:'当前文件', waitingUpload:'等待上传', autoDetectDesc:'自动识别为系统默认流程，无需客户勾选。', scanDetected:'检测到 PDF 或图片文件', scanHint:'若文件属于扫描件或图片文字，可在下方开启 OCR。', enableOcr:'开启 OCR',
    chooseFormats:'选择需要的输出格式', multiFormats:'可以同时选择多种格式', chooseProcessing:'选择处理要求', autoWorkflow:'系统会结合项目说明自动安排流程', translationSettings:'设置翻译语言与输出方式', syncAdmin:'这些信息会同步显示在管理后台', sourceLanguage:'原文语言', targetLanguage:'目标语言', customSource:'填写原文语言', customTarget:'填写目标语言', customExample:'例如：印尼语', translationOutput:'翻译输出方式',
    reviewCustomer:'客户资料', notProvidedCompany:'未填写公司', notProvidedRegion:'未填写地区', inputFiles:'输入文件', unnamedFile:'未命名文件', noFile:'没有文件', detectedFormats:'系统识别的输入格式', neededFormats:'需要的输出格式', processingRequirements:'处理要求', followRequirements:'按项目说明处理', projectDescription:'项目说明：', noExtra:'无补充说明', expectedCompletion:'期望完成：', notSpecified:'未填写', translationDirection:'翻译方向：', outputMethod:'输出方式：', submitting:'正在提交…', aiCompleted:'AI 分析已完成', recommendedWorkflow:'推荐流程：',
    trackLabel:'客户门户 V7', trackTitle:'查询订单进度', trackDesc:'输入提交成功后获得的订单号，以及下单时填写的邮箱。', trackButton:'查询订单', trackFailed:'查询失败', currentStatus:'当前状态', quotation:'报价', deliveryFiles:'交付文件',
    loginLabel:'管理员 V7', loginTitle:'管理员登录', loginDesc:'请输入后台管理密码后查看客户订单。', adminPassword:'管理员密码', passwordPlaceholder:'请输入密码', enterAdmin:'进入订单后台', wrongPassword:'管理员密码不正确', backWebsite:'返回网站',
    order:'订单', originalFiles:'个原始文件', deliveredFiles:'个交付文件', loadingOrders:'正在加载订单…', statusField:'状态', amountField:'报价金额', currencyField:'币种', quoteNoteField:'报价说明', aiAnalysis:'AI 文档分析', documentCategory:'文档类别', complexity:'复杂度', inputFormats:'输入格式', fileCount:'文件数量', workflowRecommendation:'推荐处理流程', fileAnalysis:'文件分析', basicDetected:'基础识别完成', riskWarnings:'风险提示', noAnalysis:'暂无分析结果。', translationConfig:'翻译设置', expectedTime:'期望完成时间：', noDelivery:'暂未上传交付文件。', loadFailed:'无法加载订单。', saveFailed:'保存订单失败。', uploadFailed:'上传交付文件失败。', deleteFailed:'删除订单失败。', downloadFailed:'文件下载失败', enterpriseEngine:'V10.2 AI 多服务商翻译引擎', suggestedQuote:'系统建议报价', quoteBasis:'规则报价依据', startProcessing:'开始自动处理', processingStarted:'处理任务已创建', currentJob:'当前处理任务', jobState:'任务状态', jobProgress:'进度', blockers:'配置阻塞', noBlockers:'无阻塞项', providerRequired:'请先在下方配置 AI 翻译服务。配置成功后，自动处理会真正翻译并生成交付文件。', aiSettings:'AI 自动翻译设置', aiProvider:'翻译服务商', aiApiKey:'API Key', aiModel:'模型', aiBaseUrl:'接口地址', aiSave:'保存 AI 设置', aiTest:'测试连接', aiConfigured:'AI 翻译已配置', aiNotConfigured:'尚未配置 AI 翻译', aiSaveSuccess:'AI 设置已保存', aiTestSuccess:'测试成功', aiProviderHint:'请选择 AI 服务商', aiUsage:'AI 用量与成本', aiTokens:'Token 用量', aiCost:'预估成本', aiElapsed:'翻译耗时', currentStep:'当前步骤', processingLog:'处理日志',
    outputLabels:{output_excel:['Excel','适合表格、清单、统计数据和多工作表。'],output_pdf:['PDF','适合固定版式、正式交付和打印。'],output_word:['Word','适合可编辑文档、报告和说明书。'],output_csv:['CSV','适合数据库导入、批量数据和系统交换。'],output_images:['图片','输出 PNG / JPG 页面或处理后的图片。'],output_original:['保持原格式','优化内容与排版，但保留源文件格式。']},
    processingLabels:{ocr:['扫描件 / 图片 OCR','识别图片和扫描 PDF 中的文字与表格。'],data_cleanup:['数据清理与结构化','修正空行、错列、重复内容并整理字段。'],layout_preserve:['尽量保留原始版式','保留标题、表格、分页、图片与阅读顺序。'],translation:['文档翻译','支持中文、英文、越南文等语言处理。'],manual_review:['人工质量复核','最终交付前人工检查关键内容与格式。']},
    languageLabels:{auto:'自动识别原文语言',zh_cn:'中文（简体）',zh_tw:'中文（繁体）',vi:'越南语',en:'英语',ja:'日语',ko:'韩语',th:'泰语',fr:'法语',de:'德语',es:'西班牙语',pt:'葡萄牙语',ru:'俄语',ar:'阿拉伯语',other:'其他语言'},
    translationOutputLabels:{translated_only:'仅输出译文',bilingual:'原文 + 译文双语对照',replace_keep_layout:'保留原版排版并替换文字',separate_files:'原文和译文分别输出两个文件'},
    statusLabels:{waiting_quote:'等待报价',quoted:'已报价',confirmed:'已确认',processing:'处理中',quality_review:'质量复核',completed:'已完成',cancelled:'已取消'},
  },
  en: {
    nav: ['Services', 'Process', 'Quote', 'Contact'],
    badge: 'AI Industrial Document Services',
    title1: 'Upload your documents.',
    title2: 'We deliver professional results.',
    intro: 'Upload PDF, Excel, Word, images or ZIP. The system identifies the input automatically and supports multiple output formats.',
    upload: 'Start file upload',
    admin: 'Order dashboard',
    trust: 'Human reviewed · Confidential files · ZH / EN / VI',
    wizardTitle: 'Submit a document processing order',
    stepFiles: 'Upload files',
    stepCustomer: 'Customer details',
    stepService: 'Select services',
    stepConfirm: 'Review & submit',
    next: 'Continue',
    previous: 'Back',
    submit: 'Submit order',
    selectFiles: 'Click to choose files or drag files here',
    filesHint: 'PDF, Excel, Word, images and ZIP · maximum 100 MB per file',
    noFiles: 'Please select at least one file.',
    name: 'Name',
    company: 'Company (optional)',
    email: 'Email',
    whatsapp: 'WhatsApp / Phone (optional)',
    country: 'Country or region',
    deadline: 'Expected delivery time',
    requirements: 'Project requirements',
    orderSuccess: 'Order submitted successfully',
    orderNumber: 'Order number',
    successDesc: 'Your files and order information have been saved. Open the dashboard to review them.',
    createAnother: 'Create another order',
    viewAdmin: 'Open order dashboard',
    adminTitle: 'Admin dashboard · Orders',
    refresh: 'Refresh',
    backHome: 'Back to website',
    emptyOrders: 'No orders yet.',
    status: 'Status',
    customer: 'Customer',
    services: 'Services',
    created: 'Created',
    files: 'Files',
    detail: 'View details',
    quote: 'Quotation',
    adminNote: 'Admin note',
    save: 'Save changes',
    uploadResult: 'Upload delivery files',
    outputs: 'Delivery files',
    deleteOrder: 'Delete order',
    deleteConfirm: 'Delete this order and all related files?',
    totalOrders: 'Total orders',
    completed: 'Completed',
    processing: 'Processing',
    waitingQuote: 'Waiting quote',
    searchOrders:'Search order, customer, email or company', allStatuses:'All statuses', exportOrders:'Export orders CSV', logout:'Sign out', noMatchOrders:'No matching orders.',
    brandSubtitle:'Professional Document Services', workflowTitle:'Order workflow', realData:'Real data', customerUploads:'Customer uploads files', uploadStep:'Upload', filesSaved:'Files saved', customerStep:'Customer', contactDetails:'Contact details', orderStep:'Order', sqliteRecord:'SQLite record', adminStep:'Admin', reviewQuote:'Review & quote', orderCreated:'Order created successfully', visibleDashboard:'Visible in the admin dashboard', ready:'Ready',
    proofUploadTitle:'Real file upload', proofUploadDesc:'Multipart upload to FastAPI', proofOrdersTitle:'SQLite orders', proofOrdersDesc:'Persistent local order database', proofAdminTitle:'Admin dashboard', proofAdminDesc:'Review customers, services and files', proofDownloadTitle:'File download', proofDownloadDesc:'Download original customer uploads',
    servicesLabel:'Services', servicesTitle:'One order can include multiple services', servicesDesc:'Select exactly what the customer needs before submission.', businessLabel:'Business workflow', businessTitle:'A complete path from customer upload to your dashboard', businessSteps:[['Upload','Customer sends one or multiple files.'],['Details','Name, email, company and deadline.'],['Services','OCR, translation, conversion or review.'],['Submit','Files and order are saved by FastAPI.'],['Admin','You review and download customer files.']],
    storageTitle:'Local development storage', storageDesc:'Files stay on your computer during testing.', safeNamesTitle:'Safe file names', safeNamesDesc:'Uploaded files are stored with unique internal names.', contactSavedTitle:'Customer contact saved', contactSavedDesc:'Email and project requirements are kept with each order.', footerDesc:'V7 intelligent document analysis and order platform', orderDashboard:'Order dashboard', backTop:'Back to top ↑',
    stepOutput:'Output & processing requirements', requiredContact:'Please enter your name and email.', chooseOutput:'Please select at least one output format.', sameLanguage:'Source and target languages cannot be the same.', fillTarget:'Please enter the target language.', submitFailed:'Order submission failed.', detectedTitle:'Input format detected automatically', imageScan:'Image / scanned document', zipArchive:'ZIP archive', unknownFormat:'Unknown format', exampleDeadline:'Example: 2 business days', exampleRequirements:'Example: clean the data, preserve the layout, translate to English, and output Excel and PDF…',
    autoDetectTitle:'Input format detected automatically', currentFiles:'Current files', waitingUpload:'Waiting for upload', autoDetectDesc:'Automatic detection is a default system process and does not need to be selected.', scanDetected:'PDF or image file detected', scanHint:'Enable OCR below when the file contains scanned or image-based text.', enableOcr:'Enable OCR', chooseFormats:'Select required output formats', multiFormats:'Multiple formats may be selected', chooseProcessing:'Select processing requirements', autoWorkflow:'The system will arrange the workflow based on the project description', translationSettings:'Translation language and output settings', syncAdmin:'These settings will also appear in the admin dashboard', sourceLanguage:'Source language', targetLanguage:'Target language', customSource:'Enter source language', customTarget:'Enter target language', customExample:'Example: Indonesian', translationOutput:'Translation output mode',
    reviewCustomer:'Customer details', notProvidedCompany:'Company not provided', notProvidedRegion:'Region not provided', inputFiles:'Input files', unnamedFile:'Unnamed file', noFile:'No files', detectedFormats:'Detected input formats', neededFormats:'Required output formats', processingRequirements:'Processing requirements', followRequirements:'Process according to project description', projectDescription:'Project description:', noExtra:'No additional notes', expectedCompletion:'Expected completion:', notSpecified:'Not specified', translationDirection:'Translation direction:', outputMethod:'Output method:', submitting:'Submitting…', aiCompleted:'AI analysis completed', recommendedWorkflow:'Recommended workflow:',
    trackLabel:'Customer Portal V7', trackTitle:'Track order progress', trackDesc:'Enter the order number received after submission and the email used for the order.', trackButton:'Track order', trackFailed:'Order lookup failed', currentStatus:'Current status', quotation:'Quotation', deliveryFiles:'Delivery files',
    loginLabel:'Admin V7', loginTitle:'Administrator login', loginDesc:'Enter the administrator password to view customer orders.', adminPassword:'Administrator password', passwordPlaceholder:'Enter password', enterAdmin:'Open order dashboard', wrongPassword:'Incorrect administrator password', backWebsite:'Back to website',
    order:'Order', originalFiles:'source files', deliveredFiles:'delivery files', loadingOrders:'Loading orders…', statusField:'Status', amountField:'Quote amount', currencyField:'Currency', quoteNoteField:'Quote note', aiAnalysis:'AI document analysis', documentCategory:'Document category', complexity:'Complexity', inputFormats:'Input formats', fileCount:'File count', workflowRecommendation:'Recommended workflow', fileAnalysis:'File analysis', basicDetected:'Basic analysis completed', riskWarnings:'Risk warnings', noAnalysis:'No analysis result.', translationConfig:'Translation settings', expectedTime:'Expected completion:', noDelivery:'No delivery files uploaded.', loadFailed:'Unable to load orders.', saveFailed:'Unable to save order.', uploadFailed:'Unable to upload delivery files.', deleteFailed:'Unable to delete order.', downloadFailed:'File download failed', enterpriseEngine:'V10.2 multi-provider AI translation engine', suggestedQuote:'Suggested quote', quoteBasis:'Rule-based quote basis', startProcessing:'Start automated processing', processingStarted:'Processing job created', currentJob:'Current processing job', jobState:'Job state', jobProgress:'Progress', blockers:'Configuration blockers', noBlockers:'No blockers', providerRequired:'Configure the AI translation service below. After configuration, automated processing will translate and generate delivery files.', aiSettings:'AI automatic translation settings', aiProvider:'Translation provider', aiApiKey:'API Key', aiModel:'Model', aiBaseUrl:'Base URL', aiSave:'Save AI settings', aiTest:'Test connection', aiConfigured:'AI translation configured', aiNotConfigured:'AI translation not configured', aiSaveSuccess:'AI settings saved', aiTestSuccess:'Connection test succeeded', aiProviderHint:'Select an AI provider', aiUsage:'AI usage and cost', aiTokens:'Token usage', aiCost:'Estimated cost', aiElapsed:'Translation time', currentStep:'Current step', processingLog:'Processing log',
    outputLabels:{output_excel:['Excel','Best for tables, lists, statistics and multiple worksheets.'],output_pdf:['PDF','Best for fixed layouts, formal delivery and printing.'],output_word:['Word','Best for editable documents, reports and manuals.'],output_csv:['CSV','Best for database import, batch data and system exchange.'],output_images:['Images','Export PNG / JPG pages or processed images.'],output_original:['Keep original format','Improve content and layout while retaining the source format.']},
    processingLabels:{ocr:['Scanned document / image OCR','Recognize text and tables in images and scanned PDFs.'],data_cleanup:['Data cleaning and structuring','Fix blank rows, misaligned columns and duplicate content.'],layout_preserve:['Preserve original layout','Keep headings, tables, pagination, images and reading order.'],translation:['Document translation','Supports Chinese, English, Vietnamese and other languages.'],manual_review:['Human quality review','A person checks key content and formatting before delivery.']},
    languageLabels:{auto:'Detect source language automatically',zh_cn:'Chinese (Simplified)',zh_tw:'Chinese (Traditional)',vi:'Vietnamese',en:'English',ja:'Japanese',ko:'Korean',th:'Thai',fr:'French',de:'German',es:'Spanish',pt:'Portuguese',ru:'Russian',ar:'Arabic',other:'Other language'}, translationOutputLabels:{translated_only:'Translated text only',bilingual:'Source + translation side by side',replace_keep_layout:'Replace text while preserving layout',separate_files:'Source and translation as separate files'}, statusLabels:{waiting_quote:'Waiting quote',quoted:'Quoted',confirmed:'Confirmed',processing:'Processing',quality_review:'Quality review',completed:'Completed',cancelled:'Cancelled'},
  },
  vi: {
    nav: ['Dịch vụ', 'Quy trình', 'Báo giá', 'Liên hệ'],
    badge: 'Dịch vụ xử lý tài liệu công nghiệp bằng AI',
    title1: 'Tải tài liệu lên.',
    title2: 'Chúng tôi bàn giao kết quả chuyên nghiệp.',
    intro: 'Hỗ trợ PDF, Excel, Word, hình ảnh và ZIP. Hệ thống tự nhận dạng đầu vào và cho phép chọn nhiều định dạng đầu ra.',
    upload: 'Bắt đầu tải tệp',
    admin: 'Trang quản lý đơn hàng',
    trust: 'Kiểm tra thủ công · Bảo mật · Trung / Anh / Việt',
    wizardTitle: 'Gửi đơn xử lý tài liệu',
    stepFiles: 'Tải tệp',
    stepCustomer: 'Thông tin khách hàng',
    stepService: 'Chọn dịch vụ',
    stepConfirm: 'Kiểm tra và gửi',
    next: 'Tiếp tục',
    previous: 'Quay lại',
    submit: 'Gửi đơn hàng',
    selectFiles: 'Nhấp để chọn tệp hoặc kéo thả vào đây',
    filesHint: 'PDF, Excel, Word, hình ảnh và ZIP · tối đa 100 MB mỗi tệp',
    noFiles: 'Vui lòng chọn ít nhất một tệp.',
    name: 'Họ tên',
    company: 'Công ty (không bắt buộc)',
    email: 'Email',
    whatsapp: 'WhatsApp / Điện thoại',
    country: 'Quốc gia hoặc khu vực',
    deadline: 'Thời gian mong muốn',
    requirements: 'Yêu cầu dự án',
    orderSuccess: 'Đã gửi đơn hàng thành công',
    orderNumber: 'Mã đơn hàng',
    successDesc: 'Tệp và thông tin đơn hàng đã được lưu. Bạn có thể mở trang quản trị để kiểm tra.',
    createAnother: 'Tạo đơn hàng khác',
    viewAdmin: 'Mở trang quản trị',
    adminTitle: 'Trang quản trị · Danh sách đơn hàng',
    refresh: 'Làm mới',
    backHome: 'Quay lại trang web',
    emptyOrders: 'Chưa có đơn hàng.',
    status: 'Trạng thái',
    customer: 'Khách hàng',
    services: 'Dịch vụ',
    created: 'Thời gian',
    files: 'Tệp',
    detail: 'Xem chi tiết',
    quote: 'Quản lý báo giá',
    adminNote: 'Ghi chú quản trị',
    save: 'Lưu thay đổi',
    uploadResult: 'Tải tệp bàn giao',
    outputs: 'Tệp bàn giao',
    deleteOrder: 'Xóa đơn hàng',
    deleteConfirm: 'Xóa đơn hàng và tất cả tệp liên quan?',
    totalOrders: 'Tổng đơn hàng',
    completed: 'Đã hoàn thành',
    processing: 'Đang xử lý',
    waitingQuote: 'Chờ báo giá',
    searchOrders:'Tìm mã đơn, khách hàng, email hoặc công ty', allStatuses:'Tất cả trạng thái', exportOrders:'Xuất CSV đơn hàng', logout:'Đăng xuất', noMatchOrders:'Không có đơn hàng phù hợp.',
    brandSubtitle:'Dịch vụ tài liệu chuyên nghiệp', workflowTitle:'Quy trình đơn hàng', realData:'Dữ liệu thật', customerUploads:'Khách hàng tải tệp lên', uploadStep:'Tải lên', filesSaved:'Đã lưu tệp', customerStep:'Khách hàng', contactDetails:'Thông tin liên hệ', orderStep:'Đơn hàng', sqliteRecord:'Bản ghi SQLite', adminStep:'Quản trị', reviewQuote:'Kiểm tra và báo giá', orderCreated:'Đã tạo đơn hàng thành công', visibleDashboard:'Hiển thị trong trang quản trị', ready:'Sẵn sàng',
    proofUploadTitle:'Tải tệp thật', proofUploadDesc:'Tải nhiều tệp qua FastAPI', proofOrdersTitle:'Đơn hàng SQLite', proofOrdersDesc:'Cơ sở dữ liệu đơn hàng cục bộ lâu dài', proofAdminTitle:'Trang quản trị', proofAdminDesc:'Xem khách hàng, dịch vụ và tệp', proofDownloadTitle:'Tải tệp xuống', proofDownloadDesc:'Tải tệp gốc khách hàng đã gửi',
    servicesLabel:'Dịch vụ', servicesTitle:'Một đơn hàng có thể gồm nhiều dịch vụ', servicesDesc:'Chọn chính xác nội dung khách hàng cần trước khi gửi.', businessLabel:'Quy trình nghiệp vụ', businessTitle:'Quy trình hoàn chỉnh từ lúc khách tải tệp đến trang quản trị', businessSteps:[['Tải lên','Khách hàng gửi một hoặc nhiều tệp.'],['Thông tin','Họ tên, email, công ty và thời hạn.'],['Dịch vụ','OCR, dịch thuật, chuyển đổi hoặc kiểm tra.'],['Gửi đơn','Tệp và đơn hàng được FastAPI lưu lại.'],['Quản trị','Bạn xem và tải tệp của khách hàng.']],
    storageTitle:'Lưu trữ phát triển cục bộ', storageDesc:'Tệp được lưu trên máy tính của bạn trong quá trình thử nghiệm.', safeNamesTitle:'Tên tệp an toàn', safeNamesDesc:'Tệp tải lên được lưu bằng tên nội bộ duy nhất.', contactSavedTitle:'Đã lưu liên hệ khách hàng', contactSavedDesc:'Email và yêu cầu dự án được lưu cùng từng đơn hàng.', footerDesc:'Nền tảng phân tích tài liệu thông minh và quản lý đơn hàng V7', orderDashboard:'Trang quản lý đơn hàng', backTop:'Lên đầu trang ↑',
    stepOutput:'Đầu ra và yêu cầu xử lý', requiredContact:'Vui lòng nhập họ tên và email.', chooseOutput:'Vui lòng chọn ít nhất một định dạng đầu ra.', sameLanguage:'Ngôn ngữ nguồn và ngôn ngữ đích không được giống nhau.', fillTarget:'Vui lòng nhập ngôn ngữ đích.', submitFailed:'Không thể gửi đơn hàng.', detectedTitle:'Đã tự động nhận dạng định dạng đầu vào', imageScan:'Hình ảnh / tài liệu quét', zipArchive:'Tệp nén ZIP', unknownFormat:'Định dạng không xác định', exampleDeadline:'Ví dụ: 2 ngày làm việc', exampleRequirements:'Ví dụ: làm sạch dữ liệu, giữ bố cục, dịch sang tiếng Việt, xuất Excel và PDF…',
    autoDetectTitle:'Hệ thống đã tự động nhận dạng đầu vào', currentFiles:'Tệp hiện tại', waitingUpload:'Đang chờ tải lên', autoDetectDesc:'Nhận dạng tự động là quy trình mặc định, khách hàng không cần chọn.', scanDetected:'Đã phát hiện PDF hoặc hình ảnh', scanHint:'Bật OCR bên dưới nếu tệp là bản quét hoặc chứa chữ trong ảnh.', enableOcr:'Bật OCR', chooseFormats:'Chọn định dạng đầu ra cần thiết', multiFormats:'Có thể chọn nhiều định dạng', chooseProcessing:'Chọn yêu cầu xử lý', autoWorkflow:'Hệ thống sẽ sắp xếp quy trình dựa trên mô tả dự án', translationSettings:'Thiết lập ngôn ngữ và cách xuất bản dịch', syncAdmin:'Thông tin này cũng sẽ hiển thị trong trang quản trị', sourceLanguage:'Ngôn ngữ nguồn', targetLanguage:'Ngôn ngữ đích', customSource:'Nhập ngôn ngữ nguồn', customTarget:'Nhập ngôn ngữ đích', customExample:'Ví dụ: tiếng Indonesia', translationOutput:'Cách xuất bản dịch',
    reviewCustomer:'Thông tin khách hàng', notProvidedCompany:'Chưa nhập công ty', notProvidedRegion:'Chưa nhập khu vực', inputFiles:'Tệp đầu vào', unnamedFile:'Tệp chưa đặt tên', noFile:'Không có tệp', detectedFormats:'Định dạng đầu vào đã nhận dạng', neededFormats:'Định dạng đầu ra cần thiết', processingRequirements:'Yêu cầu xử lý', followRequirements:'Xử lý theo mô tả dự án', projectDescription:'Mô tả dự án:', noExtra:'Không có ghi chú thêm', expectedCompletion:'Thời gian mong muốn:', notSpecified:'Chưa xác định', translationDirection:'Hướng dịch:', outputMethod:'Cách xuất:', submitting:'Đang gửi…', aiCompleted:'Đã hoàn tất phân tích AI', recommendedWorkflow:'Quy trình đề xuất:',
    trackLabel:'Cổng khách hàng V7', trackTitle:'Tra cứu tiến độ đơn hàng', trackDesc:'Nhập mã đơn hàng nhận được sau khi gửi và email đã dùng để đặt đơn.', trackButton:'Tra cứu đơn hàng', trackFailed:'Không thể tra cứu đơn hàng', currentStatus:'Trạng thái hiện tại', quotation:'Báo giá', deliveryFiles:'Tệp bàn giao',
    loginLabel:'Quản trị V7', loginTitle:'Đăng nhập quản trị', loginDesc:'Nhập mật khẩu quản trị để xem đơn hàng của khách.', adminPassword:'Mật khẩu quản trị', passwordPlaceholder:'Nhập mật khẩu', enterAdmin:'Vào trang quản trị', wrongPassword:'Mật khẩu quản trị không đúng', backWebsite:'Quay lại trang web',
    order:'Đơn hàng', originalFiles:'tệp gốc', deliveredFiles:'tệp bàn giao', loadingOrders:'Đang tải đơn hàng…', statusField:'Trạng thái', amountField:'Số tiền báo giá', currencyField:'Loại tiền', quoteNoteField:'Nội dung báo giá', aiAnalysis:'Phân tích tài liệu AI', documentCategory:'Loại tài liệu', complexity:'Độ phức tạp', inputFormats:'Định dạng đầu vào', fileCount:'Số lượng tệp', workflowRecommendation:'Quy trình đề xuất', fileAnalysis:'Phân tích tệp', basicDetected:'Đã hoàn tất nhận dạng cơ bản', riskWarnings:'Cảnh báo rủi ro', noAnalysis:'Chưa có kết quả phân tích.', translationConfig:'Thiết lập dịch thuật', expectedTime:'Thời gian mong muốn:', noDelivery:'Chưa tải tệp bàn giao.', loadFailed:'Không thể tải đơn hàng.', saveFailed:'Không thể lưu đơn hàng.', uploadFailed:'Không thể tải tệp bàn giao.', deleteFailed:'Không thể xóa đơn hàng.', downloadFailed:'Không thể tải tệp xuống', enterpriseEngine:'Bộ máy dịch AI đa nhà cung cấp V10.2', suggestedQuote:'Báo giá đề xuất', quoteBasis:'Cơ sở báo giá theo quy tắc', startProcessing:'Bắt đầu xử lý tự động', processingStarted:'Đã tạo tác vụ xử lý', currentJob:'Tác vụ xử lý hiện tại', jobState:'Trạng thái tác vụ', jobProgress:'Tiến độ', blockers:'Cấu hình còn thiếu', noBlockers:'Không có mục chặn', providerRequired:'Hãy cấu hình dịch vụ dịch AI bên dưới. Sau khi cấu hình, xử lý tự động sẽ dịch và tạo tệp bàn giao.', aiSettings:'Cài đặt dịch tự động AI', aiProvider:'Nhà cung cấp dịch', aiApiKey:'API Key', aiModel:'Mô hình', aiBaseUrl:'Địa chỉ API', aiSave:'Lưu cài đặt AI', aiTest:'Kiểm tra kết nối', aiConfigured:'Đã cấu hình dịch AI', aiNotConfigured:'Chưa cấu hình dịch AI', aiSaveSuccess:'Đã lưu cài đặt AI', aiTestSuccess:'Kiểm tra kết nối thành công', aiProviderHint:'Chọn nhà cung cấp AI', aiUsage:'Mức sử dụng và chi phí AI', aiTokens:'Số token', aiCost:'Chi phí ước tính', aiElapsed:'Thời gian dịch', currentStep:'Bước hiện tại', processingLog:'Nhật ký xử lý',
    outputLabels:{output_excel:['Excel','Phù hợp với bảng, danh sách, dữ liệu thống kê và nhiều trang tính.'],output_pdf:['PDF','Phù hợp với bố cục cố định, bàn giao chính thức và in ấn.'],output_word:['Word','Phù hợp với tài liệu có thể chỉnh sửa, báo cáo và hướng dẫn.'],output_csv:['CSV','Phù hợp để nhập cơ sở dữ liệu, xử lý hàng loạt và trao đổi hệ thống.'],output_images:['Hình ảnh','Xuất trang PNG / JPG hoặc hình ảnh đã xử lý.'],output_original:['Giữ định dạng gốc','Tối ưu nội dung và bố cục nhưng giữ nguyên định dạng nguồn.']},
    processingLabels:{ocr:['OCR tài liệu quét / hình ảnh','Nhận dạng chữ và bảng trong hình ảnh hoặc PDF quét.'],data_cleanup:['Làm sạch và cấu trúc dữ liệu','Sửa hàng trống, lệch cột, nội dung trùng lặp và sắp xếp trường.'],layout_preserve:['Giữ bố cục gốc tối đa','Giữ tiêu đề, bảng, phân trang, hình ảnh và thứ tự đọc.'],translation:['Dịch tài liệu','Hỗ trợ tiếng Trung, tiếng Anh, tiếng Việt và các ngôn ngữ khác.'],manual_review:['Kiểm tra chất lượng thủ công','Nhân viên kiểm tra nội dung và định dạng quan trọng trước khi bàn giao.']},
    languageLabels:{auto:'Tự động nhận dạng ngôn ngữ nguồn',zh_cn:'Tiếng Trung giản thể',zh_tw:'Tiếng Trung phồn thể',vi:'Tiếng Việt',en:'Tiếng Anh',ja:'Tiếng Nhật',ko:'Tiếng Hàn',th:'Tiếng Thái',fr:'Tiếng Pháp',de:'Tiếng Đức',es:'Tiếng Tây Ban Nha',pt:'Tiếng Bồ Đào Nha',ru:'Tiếng Nga',ar:'Tiếng Ả Rập',other:'Ngôn ngữ khác'}, translationOutputLabels:{translated_only:'Chỉ xuất bản dịch',bilingual:'Đối chiếu song ngữ nguyên văn + bản dịch',replace_keep_layout:'Thay chữ nhưng giữ bố cục gốc',separate_files:'Xuất nguyên văn và bản dịch thành hai tệp'}, statusLabels:{waiting_quote:'Chờ báo giá',quoted:'Đã báo giá',confirmed:'Đã xác nhận',processing:'Đang xử lý',quality_review:'Kiểm tra chất lượng',completed:'Đã hoàn thành',cancelled:'Đã hủy'},
  }
}

const OUTPUT_ICONS = {output_excel:FileSpreadsheet,output_pdf:FileText,output_word:FileText,output_csv:ListChecks,output_images:File,output_original:ShieldCheck}
const OUTPUT_IDS = Object.keys(OUTPUT_ICONS)
const PROCESSING_IDS = ['ocr','data_cleanup','layout_preserve','translation','manual_review']
const LANGUAGE_IDS = ['auto','zh_cn','zh_tw','vi','en','ja','ko','th','fr','de','es','pt','ru','ar','other']
const TRANSLATION_OUTPUT_IDS = ['translated_only','bilingual','replace_keep_layout','separate_files']
const outputOptions = (t) => OUTPUT_IDS.map(id=>({id,icon:OUTPUT_ICONS[id],title:t.outputLabels[id][0],desc:t.outputLabels[id][1]}))
const processingOptionsFor = (t) => PROCESSING_IDS.map(id=>({id,title:t.processingLabels[id][0],desc:t.processingLabels[id][1]}))
const languageOptionsFor = (t) => LANGUAGE_IDS.map(id=>[id,t.languageLabels[id]])
const translationOutputOptionsFor = (t) => TRANSLATION_OUTPUT_IDS.map(id=>[id,t.translationOutputLabels[id]])
const languageLabel = (t,id,custom='') => id === 'other' ? (custom || t.languageLabels.other) : (t.languageLabels[id] || id)
const translationOutputLabel = (t,id) => t.translationOutputLabels[id] || id
const requestLabel = (t,id) => t.outputLabels[id]?.[0] || t.processingLabels[id]?.[0] || id
const statusLabel = (t,status) => t.statusLabels[status] || status?.replaceAll('_',' ')


const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function AdminLogin({ t, onLogin, onBack }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const submit = async (e) => {
    e.preventDefault(); setError('')
    try {
      const response = await fetch(`${API_BASE}/api/orders`, {headers:{'X-Admin-Key':password}})
      if (!response.ok) throw new Error(t.wrongPassword)
      onLogin(password)
    } catch (err) { setError(err.message) }
  }
  return <main className="login-page"><form className="login-card" onSubmit={submit}>
    <div className="login-icon"><LockKeyhole size={28}/></div><span className="section-label">{t.loginLabel}</span>
    <h1>{t.loginTitle}</h1><p>{t.loginDesc}</p>
    {error && <div className="error-box">{error}</div>}
    <label>{t.adminPassword}<input type="password" autoFocus value={password} onChange={e=>setPassword(e.target.value)} placeholder={t.passwordPlaceholder}/></label>
    <button className="next-button" type="submit"><LockKeyhole size={16}/>{t.enterAdmin}</button>
    <button className="back-button" type="button" onClick={onBack}><ArrowLeft size={16}/>{t.backWebsite}</button>
  </form></main>
}

function TrackOrder({ t }) {
  const [form,setForm]=useState({order_number:'',email:''})
  const [data,setData]=useState(null), [error,setError]=useState(''), [loading,setLoading]=useState(false)
  const track=async(e)=>{e.preventDefault();setLoading(true);setError('');setData(null);try{
    const q=new URLSearchParams(form); const r=await fetch(`${API_BASE}/api/track?${q}`); const d=await r.json();
    if(!r.ok) throw new Error(d.detail||t.trackFailed); setData(d)
  }catch(err){setError(err.message)}finally{setLoading(false)}}
  return <section className="track-section" id="track"><div className="track-card">
    <div><span className="section-label">{t.trackLabel}</span><h2>{t.trackTitle}</h2><p>{t.trackDesc}</p></div>
    <form onSubmit={track}><label>{t.orderNumber}<input value={form.order_number} onChange={e=>setForm({...form,order_number:e.target.value})} placeholder="DA-20260715-XXXXXX" required/></label><label>{t.email}<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/></label><button className="next-button" disabled={loading}>{loading?<RefreshCw className="spin" size={16}/>:<Eye size={16}/>} {t.trackButton}</button></form>
    {error&&<div className="error-box">{error}</div>}
    {data&&<div className="track-result"><div><small>{t.orderNumber}</small><strong>{data.order_number}</strong></div><div><small>{t.currentStatus}</small><strong>{statusLabel(t,data.status)}</strong></div><div><small>{t.quotation}</small><strong>{data.quote_amount==null?t.waitingQuote:`${data.quote_amount} ${data.quote_currency}`}</strong></div>{data.quote_note&&<p>{data.quote_note}</p>}
      {data.output_files?.length>0&&<div className="track-files"><h4>{t.deliveryFiles}</h4>{data.output_files.map(file=><a key={file.id} className="download-link output-link" href={`${API_BASE}/api/track/output-files/${file.id}/download?order_number=${encodeURIComponent(form.order_number)}&email=${encodeURIComponent(form.email)}`}><Download size={15}/><span><b>{file.original_name}</b><small>{formatBytes(file.size_bytes)}</small></span></a>)}</div>}
    </div>}
  </div></section>
}

function UploadWizard({ t, openAdmin }) {
  const [step, setStep] = useState(1)
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [customer, setCustomer] = useState({
    name: '', company: '', email: '', whatsapp: '', country: '',
    deadline: '', requirements: ''
  })
  const [outputFormats, setOutputFormats] = useState([])
  const [processing, setProcessing] = useState(['layout_preserve', 'manual_review'])
  const [translation, setTranslation] = useState({
    source_language: 'auto', target_language: 'vi', custom_source_language: '',
    custom_target_language: '', output_mode: 'translated_only'
  })
  const [result, setResult] = useState(null)

  const toggle = (setter, id) => setter(current =>
    current.includes(id) ? current.filter(x => x !== id) : [...current, id]
  )

  const detectedTypes = useMemo(() => {
    const types = [...new Set(files.map(file => {
      const ext = file.name.split('.').pop()?.toLowerCase() || ''
      if (ext === 'pdf') return 'PDF'
      if (['xlsx','xls','csv'].includes(ext)) return ext === 'csv' ? 'CSV' : 'Excel'
      if (['docx','doc'].includes(ext)) return 'Word'
      if (['png','jpg','jpeg','tif','tiff'].includes(ext)) return t.imageScan
      if (ext === 'zip') return t.zipArchive
      return ext.toUpperCase() || t.unknownFormat
    }))]
    return types
  }, [files, t])

  const hasScannableInput = useMemo(() => files.some(file => {
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    return ['pdf','png','jpg','jpeg','tif','tiff'].includes(ext)
  }), [files])

  const next = () => {
    setError('')
    if (step === 1 && files.length === 0) return setError(t.noFiles)
    if (step === 2 && (!customer.name.trim() || !customer.email.trim())) return setError(t.requiredContact)
    if (step === 3 && outputFormats.length === 0) return setError(t.chooseOutput)
    if (step === 3 && processing.includes('translation') && translation.source_language === translation.target_language && translation.source_language !== 'auto') return setError(t.sameLanguage)
    if (step === 3 && processing.includes('translation') && translation.target_language === 'other' && !translation.custom_target_language.trim()) return setError(t.fillTarget)
    setStep(current => Math.min(4, current + 1))
  }

  const submitOrder = async () => {
    setSubmitting(true); setError('')
    try {
      const form = new FormData()
      files.forEach(file => form.append('files', file))
      Object.entries(customer).forEach(([key, value]) => form.append(key, value))
      form.append('services', JSON.stringify([...outputFormats, ...processing]))
      form.append('translation_json', processing.includes('translation') ? JSON.stringify(translation) : '{}')
      const response = await fetch(`${API_BASE}/api/orders`, { method: 'POST', body: form })
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || t.submitFailed)
      setResult(data)
    } catch (err) {
      setError(err.message || t.submitFailed)
    } finally {
      setSubmitting(false)
    }
  }

  const reset = () => {
    setStep(1); setFiles([]); setResult(null); setOutputFormats([])
    setProcessing(['layout_preserve', 'manual_review'])
    setTranslation({source_language:'auto',target_language:'vi',custom_source_language:'',custom_target_language:'',output_mode:'translated_only'})
    setCustomer({name:'',company:'',email:'',whatsapp:'',country:'',deadline:'',requirements:''})
  }

  if (result) {
    return <div className="success-panel">
      <div className="success-icon"><Check size={34}/></div>
      <h3>{t.orderSuccess}</h3><p>{t.successDesc}</p>
      <div className="order-number"><span>{t.orderNumber}</span><strong>{result.order_number}</strong></div>{result.ai_analysis && <div className="success-analysis"><Sparkles size={18}/><div><b>{t.aiCompleted}</b><p>{result.ai_analysis.summary}</p><small>{t.recommendedWorkflow}{(result.ai_analysis.recommended_workflow||[]).join(' → ')}</small></div></div>}
      <div className="success-actions"><button onClick={reset}>{t.createAnother}</button><button className="primary-action" onClick={openAdmin}>{t.viewAdmin}</button></div>
    </div>
  }

  return <div className="wizard-card">
    <div className="wizard-header"><div><span className="section-label">AI order system V10.1 AI Translation</span><h3>{t.wizardTitle}</h3></div><span className="step-count">{step} / 4</span></div>
    <div className="stepper">
      {[t.stepFiles, t.stepCustomer, t.stepOutput, t.stepConfirm].map((label,index)=>{
        const number=index+1
        return <div className={number<=step?'active':''} key={`${number}-${label}`}><span>{number<step?<Check size={14}/>:number}</span><small>{label}</small></div>
      })}
    </div>
    {error && <div className="error-box">{error}</div>}

    {step===1 && <div className="step-content">
      <label className="drop-zone" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();setFiles(Array.from(e.dataTransfer.files||[]))}}>
        <input type="file" multiple accept=".pdf,.xlsx,.xls,.docx,.doc,.pptx,.ppt,.csv,.png,.jpg,.jpeg,.bmp,.tif,.tiff,.zip" onChange={e=>setFiles(Array.from(e.target.files||[]))}/>
        <UploadCloud size={34}/><b>{t.selectFiles}</b><small>{t.filesHint}</small>
      </label>
      {files.length>0 && <><div className="detected-box"><Sparkles size={18}/><div><b>{t.detectedTitle}</b><p>{detectedTypes.join('、')}</p></div></div><div className="selected-files">{files.map((file,index)=><div className="selected-file" key={`${file.name}-${index}`}><span className="file-type"><File size={17}/></span><div><b>{file.name}</b><small>{formatBytes(file.size)}</small></div><button type="button" onClick={()=>setFiles(files.filter((_,i)=>i!==index))}><X size={15}/></button></div>)}</div></>}
    </div>}

    {step===2 && <div className="step-content form-grid">
      <label>{t.name}<input value={customer.name} onChange={e=>setCustomer({...customer,name:e.target.value})}/></label>
      <label>{t.email}<input type="email" value={customer.email} onChange={e=>setCustomer({...customer,email:e.target.value})}/></label>
      <label>{t.company}<input value={customer.company} onChange={e=>setCustomer({...customer,company:e.target.value})}/></label>
      <label>{t.whatsapp}<input value={customer.whatsapp} onChange={e=>setCustomer({...customer,whatsapp:e.target.value})}/></label>
      <label>{t.country}<input value={customer.country} onChange={e=>setCustomer({...customer,country:e.target.value})}/></label>
      <label>{t.deadline}<input value={customer.deadline} onChange={e=>setCustomer({...customer,deadline:e.target.value})} placeholder={t.exampleDeadline}/></label>
      <label className="full">{t.requirements}<textarea rows="5" value={customer.requirements} onChange={e=>setCustomer({...customer,requirements:e.target.value})} placeholder={t.exampleRequirements}/></label>
    </div>}

    {step===3 && <div className="step-content output-step">
      <div className="auto-detect-banner"><Sparkles size={20}/><div><b>{t.autoDetectTitle}</b><p>{t.currentFiles}: {detectedTypes.join('、') || t.waitingUpload}. {t.autoDetectDesc}</p></div></div>
      {hasScannableInput && !processing.includes('ocr') && <div className="ocr-suggestion"><ScanLine size={18}/><div><b>{t.scanDetected}</b><p>{t.scanHint}</p></div><button type="button" onClick={()=>setProcessing(current=>current.includes('ocr')?current:[...current,'ocr'])}> {t.enableOcr}</button></div>}
      <div className="option-section"><div className="option-heading"><div><span>01</span><h4>{t.chooseFormats}</h4></div><small>{t.multiFormats}</small></div>
        <div className="format-grid">{outputOptions(t).map(item=>{const Icon=item.icon;const active=outputFormats.includes(item.id);return <button type="button" key={item.id} className={active?'format-choice active':'format-choice'} onClick={()=>toggle(setOutputFormats,item.id)}><span className="choice-icon"><Icon size={19}/></span><span><b>{item.title}</b><small>{item.desc}</small></span><i>{active?<Check size={15}/>:null}</i></button>})}</div>
      </div>
      <div className="option-section"><div className="option-heading"><div><span>02</span><h4>{t.chooseProcessing}</h4></div><small>{t.autoWorkflow}</small></div>
        <div className="processing-grid">{processingOptionsFor(t).map(item=>{const active=processing.includes(item.id);return <button type="button" key={item.id} className={active?'processing-choice active':'processing-choice'} onClick={()=>toggle(setProcessing,item.id)}><i>{active?<Check size={14}/>:null}</i><span><b>{item.title}</b><small>{item.desc}</small></span></button>})}</div>
      </div>
      {processing.includes('translation') && <div className="translation-panel">
        <div className="option-heading"><div><span>03</span><h4>{t.translationSettings}</h4></div><small>{t.syncAdmin}</small></div>
        <div className="translation-grid">
          <label>{t.sourceLanguage}<select value={translation.source_language} onChange={e=>setTranslation({...translation,source_language:e.target.value})}>{languageOptionsFor(t).map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label>
          <label>{t.targetLanguage}<select value={translation.target_language} onChange={e=>setTranslation({...translation,target_language:e.target.value})}>{languageOptionsFor(t).filter(x=>x[0]!=='auto').map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label>
          {translation.source_language==='other' && <label>{t.customSource}<input value={translation.custom_source_language} onChange={e=>setTranslation({...translation,custom_source_language:e.target.value})} placeholder={t.customExample}/></label>}
          {translation.target_language==='other' && <label>{t.customTarget}<input value={translation.custom_target_language} onChange={e=>setTranslation({...translation,custom_target_language:e.target.value})} placeholder={t.customExample}/></label>}
          <label className="full">{t.translationOutput}<select value={translation.output_mode} onChange={e=>setTranslation({...translation,output_mode:e.target.value})}>{translationOutputOptionsFor(t).map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label>
        </div>
        <div className="translation-summary"><Languages size={18}/><span>{languageLabel(t,translation.source_language,translation.custom_source_language)} → {languageLabel(t,translation.target_language,translation.custom_target_language)} · {translationOutputLabel(t,translation.output_mode)}</span></div>
      </div>}
    </div>}

    {step===4 && <section className="step-content review-grid review-visible" aria-label="订单审核">
      <article className="review-card"><h4>{t.reviewCustomer}</h4><div className="review-line"><UserRound size={14}/><strong>{customer?.name?.trim() || '—'}</strong></div><div className="review-line"><Mail size={14}/><span>{customer?.email?.trim() || '—'}</span></div><div className="review-line"><Building2 size={14}/><span>{customer?.company?.trim() || t.notProvidedCompany}</span></div><div className="review-line"><span>{customer?.country?.trim() || t.notProvidedRegion}</span></div></article>
      <article className="review-card"><h4>{t.inputFiles}</h4>{Array.isArray(files) && files.length ? files.map((file,index)=><div className="review-file" key={`${file?.name || 'file'}-${index}`}><File size={14}/><span>{file?.name || t.unnamedFile}</span><small>{formatBytes(Number(file?.size) || 0)}</small></div>) : <div className="review-empty">{t.noFile}</div>}</article>
      <article className="review-card full"><h4>{t.detectedFormats}</h4><div className="review-tags">{(detectedTypes || []).map(type=><span key={type}>{type}</span>)}</div></article>
      <article className="review-card full"><h4>{t.neededFormats}</h4><div className="review-tags">{(outputFormats || []).map(id=><span key={id}>{requestLabel(t,id)}</span>)}</div></article>
      <article className="review-card full"><h4>{t.processingRequirements}</h4><div className="review-tags neutral">{(processing || []).length ? processing.map(id=><span key={id}>{requestLabel(t,id)}</span>) : <span>{t.followRequirements}</span>}</div><div className="requirements-review"><strong>{t.projectDescription}</strong><span>{customer?.requirements?.trim() || t.noExtra}</span></div><div className="requirements-review"><strong>{t.expectedCompletion}</strong><span>{customer?.deadline?.trim() || t.notSpecified}</span></div></article>
      {processing.includes('translation') && <article className="review-card full"><h4>{t.translationConfig}</h4><div className="requirements-review"><strong>{t.translationDirection}</strong><span>{languageLabel(t,translation.source_language,translation.custom_source_language)} → {languageLabel(t,translation.target_language,translation.custom_target_language)}</span></div><div className="requirements-review"><strong>{t.outputMethod}</strong><span>{translationOutputLabel(t,translation.output_mode)}</span></div></article>}
    </section>}

    <div className="wizard-footer"><button type="button" className="back-button" disabled={step===1||submitting} onClick={()=>setStep(current=>Math.max(1,current-1))}><ArrowLeft size={16}/>{t.previous}</button>{step<4?<button type="button" className="next-button" onClick={next}>{t.next}<ArrowRight size={16}/></button>:<button type="button" className="next-button" disabled={submitting} onClick={submitOrder}>{submitting?<RefreshCw className="spin" size={16}/>:<Send size={16}/>} {submitting?t.submitting:t.submit}</button>}</div>
  </div>
}

function AdminDashboard({ t, adminKey, onLogout }) {
  const statuses = Object.entries(t.statusLabels)
  const [orders, setOrders] = useState([])
  const [counts, setCounts] = useState({})
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [deliveryFiles, setDeliveryFiles] = useState([])
  const [processingOrder, setProcessingOrder] = useState(false)
  const [aiSettings, setAiSettings] = useState({provider:'none',api_key:'',model:'',base_url:'',timeout_seconds:90,max_retries:2,capability:{configured:false},providers:[]})
  const [aiSaving, setAiSaving] = useState(false)
  const [aiMessage, setAiMessage] = useState('')
  const [edit, setEdit] = useState({
    status:'waiting_quote', quote_amount:'', quote_currency:'USD',
    quote_note:'', admin_note:''
  })

  const loadOrders = async (keepId = selected?.id) => {
    setLoading(true); setError('')
    try {
      const response = await fetch(`${API_BASE}/api/orders`, {headers:{'X-Admin-Key':adminKey}})
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || t.loadFailed)
      setOrders(data.orders || [])
      setCounts(data.counts || {})
      const nextSelected = (data.orders || []).find(x => x.id === keepId)
      if (nextSelected) chooseOrder(nextSelected)
      else if (selected && !(data.orders || []).some(x => x.id === selected.id)) setSelected(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const loadAISettings = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/translation-settings`, {headers:{'X-Admin-Key':adminKey}})
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || t.loadFailed)
      setAiSettings(prev => ({...prev, ...data, api_key:''}))
    } catch (err) { setError(err.message) }
  }

  const saveAISettings = async () => {
    setAiSaving(true); setAiMessage(''); setError('')
    try {
      const response = await fetch(`${API_BASE}/api/admin/translation-settings`, {
        method:'PUT', headers:{'Content-Type':'application/json','X-Admin-Key':adminKey}, body:JSON.stringify(aiSettings)
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || t.saveFailed)
      setAiSettings(prev => ({...prev, ...data.settings, api_key:''}))
      setAiMessage(t.aiSaveSuccess)
      await loadOrders(selected?.id)
    } catch (err) { setError(err.message) } finally { setAiSaving(false) }
  }

  const testAISettings = async () => {
    setAiSaving(true); setAiMessage(''); setError('')
    try {
      if (aiSettings.api_key) await saveAISettings()
      const response = await fetch(`${API_BASE}/api/admin/translation-settings/test`, {method:'POST',headers:{'X-Admin-Key':adminKey}})
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || t.saveFailed)
      setAiMessage(`${t.aiTestSuccess}: ${data.translated_text} (${data.elapsed_ms} ms)`)
      await loadAISettings()
    } catch (err) { setError(err.message) } finally { setAiSaving(false) }
  }

  const changeAIProvider = (provider) => {
    const meta = (aiSettings.providers || []).find(item => item.id === provider)
    setAiSettings(prev => ({
      ...prev,
      provider,
      model: meta?.model || '',
      base_url: meta?.base_url || '',
      api_key: '',
    }))
    setAiMessage('')
  }

  const chooseOrder = (order) => {
    setSelected(order)
    setEdit({
      status: order.status || 'waiting_quote',
      quote_amount: order.quote_amount ?? '',
      quote_currency: order.quote_currency || 'USD',
      quote_note: order.quote_note || '',
      admin_note: order.admin_note || '',
    })
    setDeliveryFiles([])
  }

  useEffect(() => { loadOrders(null); loadAISettings() }, [])

  useEffect(() => {
    const active = selected?.processing_job && ['queued','processing'].includes(selected.processing_job.state)
    if (!active) return undefined
    const timer = window.setInterval(() => loadOrders(selected.id), 1800)
    return () => window.clearInterval(timer)
  }, [selected?.id, selected?.processing_job?.state])

  const saveOrder = async () => {
    if (!selected) return
    setSaving(true); setError('')
    try {
      const payload = {
        ...edit,
        quote_amount: edit.quote_amount === '' ? null : Number(edit.quote_amount)
      }
      const response = await fetch(`${API_BASE}/api/orders/${selected.id}`, {
        method:'PATCH',
        headers:{'Content-Type':'application/json','X-Admin-Key':adminKey},
        body:JSON.stringify(payload)
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || t.saveFailed)
      chooseOrder(data)
      await loadOrders(data.id)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const uploadOutputs = async () => {
    if (!selected || deliveryFiles.length === 0) return
    setSaving(true); setError('')
    try {
      const form = new FormData()
      deliveryFiles.forEach(file => form.append('files', file))
      const response = await fetch(`${API_BASE}/api/orders/${selected.id}/outputs`, {
        method:'POST', headers:{'X-Admin-Key':adminKey}, body:form
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || t.uploadFailed)
      setDeliveryFiles([])
      await loadOrders(selected.id)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const startProcessing = async () => {
    if (!selected) return
    setProcessingOrder(true); setError('')
    try {
      const response = await fetch(`${API_BASE}/api/orders/${selected.id}/process`, {
        method:'POST', headers:{'X-Admin-Key':adminKey}
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || t.saveFailed)
      await loadOrders(selected.id)
    } catch (err) {
      setError(err.message)
    } finally {
      setProcessingOrder(false)
    }
  }

  const deleteOrder = async () => {
    if (!selected || !window.confirm(t.deleteConfirm)) return
    setSaving(true); setError('')
    try {
      const response = await fetch(`${API_BASE}/api/orders/${selected.id}`, {method:'DELETE',headers:{'X-Admin-Key':adminKey}})
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || t.deleteFailed)
      setSelected(null)
      await loadOrders(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const downloadAdminFile = async (url, name) => {
    try {
      const response = await fetch(url, {headers:{'X-Admin-Key':adminKey}})
      if (!response.ok) throw new Error(t.downloadFailed)
      const blob = await response.blob(); const href=URL.createObjectURL(blob)
      const a=document.createElement('a'); a.href=href; a.download=name; a.click(); URL.revokeObjectURL(href)
    } catch(err) { setError(err.message) }
  }

  const filteredOrders = useMemo(() => {
    const term = searchText.trim().toLowerCase()
    return orders.filter(order => {
      const statusOk = statusFilter === 'all' || order.status === statusFilter
      if (!statusOk) return false
      if (!term) return true
      return [order.order_number, order.name, order.email, order.company, order.whatsapp, order.country]
        .filter(Boolean).some(value => String(value).toLowerCase().includes(term))
    })
  }, [orders, searchText, statusFilter])

  const exportOrdersCsv = () => {
    const headers = ['order_number','customer','email','company','status','quote_amount','currency','created_at','services']
    const escape = value => `"${String(value ?? '').replaceAll('"','""')}"`
    const rows = filteredOrders.map(order => [
      order.order_number, order.name, order.email, order.company, statusLabel(t, order.status),
      order.quote_amount ?? '', order.quote_currency || 'USD', order.created_at,
      order.services.map(id => requestLabel(t,id)).join(' | ')
    ].map(escape).join(','))
    const csv = '\ufeff' + [headers.join(','), ...rows].join('\r\n')
    const href = URL.createObjectURL(new Blob([csv], {type:'text/csv;charset=utf-8'}))
    const a = document.createElement('a'); a.href = href; a.download = `document-ai-orders-${new Date().toISOString().slice(0,10)}.csv`; a.click()
    URL.revokeObjectURL(href)
  }

  return (
    <main className="admin-page">
      <div className="admin-heading">
        <div><span className="section-label">Admin V10.2 AI Providers</span><h1>{t.adminTitle}</h1></div>
        <div className="admin-heading-actions"><button onClick={() => loadOrders()}><RefreshCw size={15}/>{t.refresh}</button><button onClick={onLogout}><LogOut size={15}/>{t.logout}</button></div>
      </div>

      <div className="admin-stats">
        <div><span>{t.totalOrders}</span><strong>{orders.length}</strong></div>
        <div><span>{t.waitingQuote}</span><strong>{counts.waiting_quote || 0}</strong></div>
        <div><span>{t.processing}</span><strong>{(counts.processing || 0) + (counts.quality_review || 0)}</strong></div>
        <div><span>{t.completed}</span><strong>{counts.completed || 0}</strong></div>
      </div>

      <div className="order-toolbar">
        <label className="order-search"><Search size={17}/><input value={searchText} onChange={e=>setSearchText(e.target.value)} placeholder={t.searchOrders}/></label>
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option value="all">{t.allStatuses}</option>{statuses.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select>
        <button onClick={exportOrdersCsv} disabled={filteredOrders.length===0}><FileDown size={16}/>{t.exportOrders}</button>
      </div>

      <section className="ai-settings-card">
        <div className="ai-settings-title"><div><h3>{t.aiSettings}</h3><p className={aiSettings.capability?.configured ? 'ai-ready' : 'ai-missing'}>{aiSettings.capability?.configured ? t.aiConfigured : t.aiNotConfigured}{aiSettings.api_key_masked ? ` · ${aiSettings.api_key_masked}` : ''}</p></div></div>
        <div className="ai-settings-grid">
          <label>{t.aiProvider}<select value={aiSettings.provider || 'none'} onChange={e=>changeAIProvider(e.target.value)}><option value="none">{t.aiProviderHint}</option>{(aiSettings.providers || []).map(provider=><option key={provider.id} value={provider.id}>{provider.label}</option>)}</select></label>
          <label>{t.aiApiKey}<input type="password" value={aiSettings.api_key || ''} placeholder={aiSettings.api_key_masked || 'sk-...'} onChange={e=>setAiSettings({...aiSettings,api_key:e.target.value})}/></label>
          <label>{t.aiModel}<input value={aiSettings.model || ''} onChange={e=>setAiSettings({...aiSettings,model:e.target.value})}/></label>
          <label>{t.aiBaseUrl}<input value={aiSettings.base_url || ''} onChange={e=>setAiSettings({...aiSettings,base_url:e.target.value})}/></label>
        </div>
        <div className="ai-settings-actions"><button disabled={aiSaving} onClick={saveAISettings}>{aiSaving?<RefreshCw className="spin" size={15}/>:<Check size={15}/>} {t.aiSave}</button><button disabled={aiSaving || aiSettings.provider==='none'} onClick={testAISettings}><Play size={15}/>{t.aiTest}</button>{aiMessage && <span className="ai-message">{aiMessage}</span>}</div>
      </section>

      {error && <div className="error-box">{error}</div>}
      {loading ? <div className="loading-card"><RefreshCw className="spin"/> {t.loadingOrders}</div> :
        orders.length === 0 ? <div className="empty-state"><FolderOpen size={34}/><p>{t.emptyOrders}</p></div> :
        filteredOrders.length === 0 ? <div className="empty-state"><Search size={34}/><p>{t.noMatchOrders}</p></div> :
        <div className="orders-layout">
          <div className="orders-table">
            <div className="orders-row orders-head"><span>{t.order}</span><span>{t.customer}</span><span>{t.services}</span><span>{t.created}</span><span>{t.status}</span></div>
            {filteredOrders.map(order => <button className={selected?.id === order.id ? 'orders-row selected' : 'orders-row'} key={order.id} onClick={() => chooseOrder(order)}>
              <span><b>{order.order_number}</b><small>{order.file_count} {t.originalFiles} · {order.output_count} {t.deliveredFiles}</small></span>
              <span><b>{order.name}</b><small>{order.email}</small></span>
              <span>{order.services.map(x => requestLabel(t,x)).join(', ')}</span>
              <span>{new Date(order.created_at).toLocaleString()}</span>
              <span className={`status-chip status-${order.status}`}>{statusLabel(t,order.status)}</span>
            </button>)}
          </div>

          <aside className="order-detail">
            {selected ? <>
              <div className="detail-title"><div><small>{t.orderNumber}</small><h3>{selected.order_number}</h3></div><span className={`status-chip status-${selected.status}`}>{statusLabel(t,selected.status)}</span></div>

              <div className="detail-section"><h4>{t.customer}</h4><p><b>{selected.name}</b></p><p>{selected.email}</p><p>{selected.company || '—'}</p><p>{selected.whatsapp || '—'}</p><p>{selected.country || '—'}</p></div>

              <div className="detail-section admin-edit">
                <h4>{t.quote}</h4>
                <label>{t.statusField}<select value={edit.status} onChange={e=>setEdit({...edit,status:e.target.value})}>{statuses.map(x=><option value={x[0]} key={x[0]}>{x[1]}</option>)}</select></label>
                <div className="quote-row">
                  <label>{t.amountField}<input type="number" min="0" step="0.01" value={edit.quote_amount} onChange={e=>setEdit({...edit,quote_amount:e.target.value})}/></label>
                  <label>{t.currencyField}<select value={edit.quote_currency} onChange={e=>setEdit({...edit,quote_currency:e.target.value})}><option>USD</option><option>CNY</option><option>VND</option><option>EUR</option></select></label>
                </div>
                <label>{t.quoteNoteField}<textarea rows="3" value={edit.quote_note} onChange={e=>setEdit({...edit,quote_note:e.target.value})}/></label>
                <label>{t.adminNote}<textarea rows="3" value={edit.admin_note} onChange={e=>setEdit({...edit,admin_note:e.target.value})}/></label>
                <button className="admin-save" disabled={saving} onClick={saveOrder}>{saving?<RefreshCw className="spin" size={15}/>:<Check size={15}/>} {t.save}</button>
              </div>

              <div className="detail-section"><h4>{t.services}</h4><div className="review-tags">{selected.services.map(id => <span key={id}>{requestLabel(t,id)}</span>)}</div></div>
              <div className="detail-section ai-analysis"><h4>{t.aiAnalysis}</h4>
                {selected.ai_analysis?.status === 'completed' ? <>
                  <p className="analysis-summary">{selected.ai_analysis.summary}</p>
                  <div className="analysis-grid"><span><b>{t.documentCategory}</b>{selected.ai_analysis.document_category}</span><span><b>{t.complexity}</b>{selected.ai_analysis.complexity}</span><span><b>{t.inputFormats}</b>{(selected.ai_analysis.input_formats||[]).join('、')}</span><span><b>{t.fileCount}</b>{selected.ai_analysis.file_count}</span></div>
                  <h5>{t.workflowRecommendation}</h5><ol className="workflow-list">{(selected.ai_analysis.recommended_workflow||[]).map((x,i)=><li key={`${i}-${x}`}>{x}</li>)}</ol>
                  <h5>{t.fileAnalysis}</h5>{(selected.ai_analysis.files||[]).map((file,i)=><div className="analysis-file" key={`${file.name}-${i}`}><b>{file.name}</b><span>{file.format}</span><small>{Object.entries(file.details||{}).filter(([,v])=>typeof v!=='object').map(([k,v])=>`${k}: ${v}`).join(' · ') || t.basicDetected}</small></div>)}
                  <h5>{t.riskWarnings}</h5><ul className="warning-list">{(selected.ai_analysis.warnings||[]).map((x,i)=><li key={`${i}-${x}`}>{x}</li>)}</ul>
                </> : <p>{t.noAnalysis}</p>}
              </div>
              <div className="detail-section enterprise-engine">
                <h4>{t.enterpriseEngine}</h4>
                {selected.suggested_quote?.amount != null && <>
                  <div className="analysis-grid"><span><b>{t.suggestedQuote}</b>{selected.suggested_quote.amount} {selected.suggested_quote.currency || 'USD'}</span><span><b>{t.quoteBasis}</b>{selected.suggested_quote.basis?.work_units || 0} units · {selected.suggested_quote.basis?.complexity || 'low'}</span></div>
                  <p className="analysis-summary">{selected.suggested_quote.note}</p>
                </>}
                {selected.processing_job ? <>
                  <h5>{t.currentJob}</h5>
                  <div className="analysis-grid"><span><b>{t.jobState}</b>{selected.processing_job.state}</span><span><b>{t.jobProgress}</b>{selected.processing_job.progress}%</span><span><b>{t.currentStep}</b>{selected.processing_job.current_step || '—'}</span></div><div className="job-progress"><i style={{width:`${selected.processing_job.progress || 0}%`}}/></div>
                  <ol className="workflow-list">{(selected.processing_job.plan||[]).map((x,i)=><li key={`${i}-${x.id}`}>{x.label}</li>)}</ol>
                  <h5>{t.blockers}</h5>
                  {(selected.processing_job.blockers||[]).length ? <ul className="warning-list">{selected.processing_job.blockers.map((x,i)=><li key={`${i}-${x}`}>{x}</li>)}</ul> : <p>{t.noBlockers}</p>}<h5>{t.processingLog}</h5><div className="processing-log">{(selected.processing_job.events||[]).length ? selected.processing_job.events.map((event,i)=><div key={`${i}-${event.created_at}`}><time>{new Date(event.created_at).toLocaleTimeString()}</time><b>{event.step}</b><span>{event.message}</span></div>) : <p>—</p>}</div>{selected.processing_job.result?.translation_usage && <div className="translation-usage"><h5>{t.aiUsage}</h5><div className="analysis-grid"><span><b>{t.aiTokens}</b>{selected.processing_job.result.translation_usage.total_tokens || 0}</span><span><b>{t.aiCost}</b>${Number(selected.processing_job.result.translation_usage.estimated_cost_usd || 0).toFixed(6)}</span><span><b>{t.aiElapsed}</b>{Math.round((selected.processing_job.result.translation_usage.elapsed_ms || 0)/1000)}s</span></div></div>}
                </> : <p>{t.providerRequired}</p>}
                <button className="admin-save" disabled={processingOrder} onClick={startProcessing}>{processingOrder?<RefreshCw className="spin" size={15}/>:<Play size={15}/>} {t.startProcessing}</button>
              </div>
              {selected.services.includes('translation') && <div className="detail-section"><h4>{t.translationConfig}</h4><p><b>{t.translationDirection}</b> {languageLabel(t,selected.translation?.source_language || 'auto', selected.translation?.custom_source_language)} → {languageLabel(t,selected.translation?.target_language || 'vi', selected.translation?.custom_target_language)}</p><p><b>{t.outputMethod}</b> {translationOutputLabel(t,selected.translation?.output_mode || 'translated_only')}</p></div>}
              <div className="detail-section"><h4>{t.requirements}</h4><p>{selected.requirements || '—'}</p><p><b>{t.expectedTime}</b> {selected.deadline || '—'}</p></div>

              <div className="detail-section"><h4>{t.files}</h4>{selected.files.map(file =>
                <button className="download-link" key={file.id} onClick={()=>downloadAdminFile(`${API_BASE}/api/files/${file.id}/download`,file.original_name)}><Download size={15}/><span><b>{file.original_name}</b><small>{formatBytes(file.size_bytes)}</small></span></button>
              )}</div>

              <div className="detail-section">
                <h4>{t.outputs}</h4>
                {selected.output_files.length === 0 && <p>{t.noDelivery}</p>}
                {selected.output_files.map(file =>
                  <button className="download-link output-link" key={file.id} onClick={()=>downloadAdminFile(`${API_BASE}/api/output-files/${file.id}/download`,file.original_name)}><Download size={15}/><span><b>{file.original_name}</b><small>{formatBytes(file.size_bytes)}</small></span></button>
                )}
                <label className="delivery-upload">
                  <input type="file" multiple accept=".pdf,.xlsx,.xls,.docx,.doc,.pptx,.ppt,.csv,.png,.jpg,.jpeg,.bmp,.zip" onChange={e=>setDeliveryFiles(Array.from(e.target.files||[]))}/>
                  <UploadCloud size={18}/><span>{deliveryFiles.length ? deliveryFiles.map(x=>x.name).join(', ') : t.uploadResult}</span>
                </label>
                <button className="admin-save" disabled={saving || deliveryFiles.length===0} onClick={uploadOutputs}><UploadCloud size={15}/>{t.uploadResult}</button>
              </div>

              <button className="delete-order" disabled={saving} onClick={deleteOrder}><X size={15}/>{t.deleteOrder}</button>
            </> : <div className="empty-detail"><Eye size={32}/><p>{t.detail}</p></div>}
          </aside>
        </div>}
    </main>
  )
}

function App() {
  const [lang, setLang] = useState('zh')
  const [adminMode, setAdminMode] = useState(window.location.hash === '#admin')
  const [adminKey, setAdminKey] = useState(sessionStorage.getItem('document_ai_admin_key') || '')
  const t = useMemo(() => COPY[lang], [lang])

  useEffect(() => { window.location.hash = adminMode ? 'admin' : '' }, [adminMode])

  return (
    <div className="app notranslate" id="top" translate="no">
      <header>
        <a href="#top" className="brand" onClick={() => setAdminMode(false)}>
          <span className="logo">DA</span>
          <span><b>Document Automation AI</b><small>{t.brandSubtitle}</small></span>
        </a>
        <nav>{t.nav.map((label, index) => <a key={label} href={index === 1 ? '#process' : index === 2 ? '#quote' : '#services'} onClick={() => setAdminMode(false)}>{label}</a>)}</nav>
        <div className="header-actions">
          <select value={lang} onChange={e => setLang(e.target.value)}>
            <option value="en">English</option><option value="zh">中文</option><option value="vi">Tiếng Việt</option>
          </select>
          <button className="text-button" onClick={() => setAdminMode(!adminMode)}>
            {adminMode ? <ArrowLeft size={15}/> : <ListChecks size={15}/>}
            {adminMode ? t.backHome : t.admin}
          </button>
        </div>
      </header>

      {adminMode ? (adminKey ? <AdminDashboard t={t} adminKey={adminKey} onLogout={()=>{sessionStorage.removeItem('document_ai_admin_key');setAdminKey('')}}/> : <AdminLogin t={t} onBack={()=>setAdminMode(false)} onLogin={(key)=>{sessionStorage.setItem('document_ai_admin_key',key);setAdminKey(key)}}/>) : <>
        <main>
          <section className="hero">
            <div className="hero-copy">
              <div className="pill"><Sparkles size={14}/>{t.badge}</div>
              <h1>{t.title1}<br/><span>{t.title2}</span></h1>
              <p>{t.intro}</p>
              <div className="hero-actions">
                <a className="primary-action" href="#quote">{t.upload}<ArrowRight size={17}/></a>
                <button className="secondary-action" onClick={() => setAdminMode(true)}><ListChecks size={16}/>{t.admin}</button>
              </div>
              <div className="trust"><BadgeCheck size={17}/>{t.trust}</div>
            </div>
            <div className="workflow-card">
              <div className="workflow-head"><span><i></i>{t.workflowTitle}</span><em>{t.realData}</em></div>
              <div className="source-file"><span className="pdf">PDF</span><div><b>{t.customerUploads}</b><small>PDF · Excel · Word · Images · ZIP</small></div><strong>1</strong></div>
              <div className="flow-line"></div>
              <div className="pipeline">
                <div><UploadCloud/><b>{t.uploadStep}</b><small>{t.filesSaved}</small></div>
                <div><UserRound/><b>{t.customerStep}</b><small>{t.contactDetails}</small></div>
                <div><ListChecks/><b>{t.orderStep}</b><small>{t.sqliteRecord}</small></div>
                <div><ShieldCheck/><b>{t.adminStep}</b><small>{t.reviewQuote}</small></div>
              </div>
              <div className="flow-line"></div>
              <div className="source-file output"><span className="xlsx">ORDER</span><div><b>{t.orderCreated}</b><small>{t.visibleDashboard}</small></div><strong>{t.ready}</strong></div>
            </div>
          </section>

          <section className="proofbar">
            <div><strong>{t.proofUploadTitle}</strong><span>{t.proofUploadDesc}</span></div>
            <div><strong>{t.proofOrdersTitle}</strong><span>{t.proofOrdersDesc}</span></div>
            <div><strong>{t.proofAdminTitle}</strong><span>{t.proofAdminDesc}</span></div>
            <div><strong>{t.proofDownloadTitle}</strong><span>{t.proofDownloadDesc}</span></div>
          </section>

          <section className="service-section" id="services">
            <div className="section-heading"><span>{t.servicesLabel}</span><h2>{t.servicesTitle}</h2><p>{t.servicesDesc}</p></div>
            <div className="service-cards">{outputOptions(t).map(({icon:Icon,title,desc},index)=><article key={title}><div><Icon/><span>0{index+1}</span></div><h3>{title}</h3><p>{desc}</p></article>)}</div>
          </section>

          <section className="business-flow" id="process">
            <div className="section-heading dark"><span>{t.businessLabel}</span><h2>{t.businessTitle}</h2></div>
            <div className="business-steps">
              {t.businessSteps.map((x,index)=><article key={index}><span>0{index+1}</span><h3>{x[0]}</h3><p>{x[1]}</p></article>)}
            </div>
          </section>

          <section className="security-strip">
            <div><LockKeyhole/><span><b>{t.storageTitle}</b><small>{t.storageDesc}</small></span></div>
            <div><ShieldCheck/><span><b>{t.safeNamesTitle}</b><small>{t.safeNamesDesc}</small></span></div>
            <div><Mail/><span><b>{t.contactSavedTitle}</b><small>{t.contactSavedDesc}</small></span></div>
          </section>

          <section className="quote-section" id="quote"><UploadWizard t={t} openAdmin={() => setAdminMode(true)}/></section><TrackOrder t={t}/>
        </main>

        <footer>
          <div className="foot-brand"><span className="logo">DA</span><span><b>Document Automation AI</b><small>{t.footerDesc}</small></span></div>
          <div className="foot-links"><a href="mailto:hello@documentautomation.ai"><Mail/>Email</a><button onClick={() => setAdminMode(true)}><ListChecks/>{t.orderDashboard}</button><a href="#top">{t.backTop}</a></div>
        </footer>
      </>}
    </div>
  )
}

export default App
