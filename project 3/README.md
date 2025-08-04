# AI Photo Generator MVP - RunwayML 视频生成集成

## 🎬 新功能：AI照片转视频

本项目已成功集成RunwayML API，实现了将AI生成的照片转换为动态视频的功能。

### ✨ 主要特性

- **照片转视频**: 将静态照片转换为动态视频
- **多种艺术风格**: 支持赛博朋克、莫奈印象派、动漫风格、水墨画等
- **实时进度监控**: 显示视频生成进度
- **错误处理**: 完善的错误处理和用户反馈
- **任务管理**: 支持取消正在进行的任务
- **视频下载**: 生成的视频可直接下载

### 🛠️ 技术栈

- **前端**: React + TypeScript + Vite
- **样式**: Tailwind CSS
- **AI视频生成**: RunwayML API
- **状态管理**: React Hooks
- **环境配置**: Vite环境变量

### 📦 安装和运行

1. **克隆项目**
```bash
git clone <repository-url>
cd project-3
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**
创建 `.env` 文件并添加你的RunwayML API密钥：
```env
VITE_RUNWAY_API_KEY=your_runway_api_key_here
```

4. **启动开发服务器**
```bash
npm run dev
```

5. **访问应用**
打开浏览器访问 http://localhost:5173

### 🎯 使用流程

1. **上传照片**: 选择一张照片上传
2. **选择风格**: 从多种AI艺术风格中选择
3. **生成照片**: 等待AI处理生成艺术照片
4. **转视频**: 点击"生成视频"按钮
5. **等待处理**: 实时查看视频生成进度
6. **下载视频**: 生成完成后可下载视频文件

### 🔧 API集成详情

#### 环境配置
- ✅ API密钥安全存储
- ✅ TypeScript类型定义
- ✅ 错误处理机制
- ✅ 任务状态轮询

#### 支持的功能
- 照片转视频生成
- 多种艺术风格支持
- 实时进度监控
- 任务取消功能
- 视频下载

#### 技术实现
```typescript
// 视频生成服务
import { generateVideo, getTaskStatus, cancelTask } from '../services/runwayService';

// 生成视频
const result = await generateVideo({
  originalImage: imageUrl,
  style: 'cyberpunk-neon',
  prompt: 'Transform this image into a cyberpunk video',
  duration: 5,
  fps: 24
});
```

### 🎨 支持的艺术风格

1. **赛博朋克 (Cyberpunk Neon)**
   - 霓虹灯效果
   - 未来城市氛围
   - 电子蓝紫色调

2. **莫奈印象派 (Monet Impressionist)**
   - 柔和笔触
   - 自然光线
   - 印象派色彩

3. **动漫工作室 (Anime Studio)**
   - 鲜艳色彩
   - 流畅动画
   - 日式动画美学

4. **水墨画 (Ink Wash)**
   - 流动墨迹效果
   - 单色调
   - 艺术笔触

### 🔒 安全注意事项

- API密钥存储在 `.env` 文件中
- `.env` 文件已添加到 `.gitignore`
- 不要在代码中硬编码API密钥
- 定期更新API密钥

### 🐛 故障排除

1. **API连接失败**
   - 检查API密钥是否正确
   - 确认网络连接正常
   - 查看浏览器控制台错误信息

2. **视频生成失败**
   - 检查输入图片格式
   - 确认图片大小适中
   - 查看错误提示信息

3. **进度不更新**
   - 刷新页面重试
   - 检查网络连接
   - 查看任务状态

### 📝 开发说明

#### 项目结构
```
src/
├── components/
│   ├── VideoGenerationView.tsx    # 视频生成界面
│   ├── RunwayMLTest.tsx          # API测试组件
│   └── APITestPage.tsx           # 测试页面
├── services/
│   └── runwayService.ts          # RunwayML API服务
└── vite-env.d.ts                # 环境变量类型定义
```

#### 关键文件
- `src/services/runwayService.ts`: RunwayML API集成
- `src/components/VideoGenerationView.tsx`: 视频生成界面
- `.env`: 环境变量配置

### 🚀 未来计划

- [ ] 支持更多视频效果
- [ ] 添加视频编辑功能
- [ ] 支持批量处理
- [ ] 添加视频预览功能
- [ ] 优化生成速度

### 📄 许可证

MIT License

### 🤝 贡献

欢迎提交Issue和Pull Request！

---

**注意**: 请确保你有有效的RunwayML API密钥才能使用视频生成功能。 