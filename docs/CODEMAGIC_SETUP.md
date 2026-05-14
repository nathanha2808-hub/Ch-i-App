# Codemagic Setup — Step-by-Step UI Walkthrough

> **Mục tiêu**: từ chưa có account → first build .app verify (10 phút, KHÔNG cần Apple Dev).
> **Tiếp đến**: setup Apple Dev + TestFlight upload (sau khi Apple Dev approved).

---

## Phase A — Build verify NGAY (10 phút, không cần Apple Dev)

### A1. Đăng ký Codemagic

1. Mở **https://codemagic.io/signup**
2. Click **"Sign up with GitHub"** (recommend) — tự authorize repo access
3. Authorize Codemagic OAuth: chọn account `nathanha.2808@gmail.com`
4. Xong → vào dashboard Codemagic

### A2. Add app

1. Codemagic dashboard → click **"Add application"** (nút xanh)
2. Chọn **GitHub** → tìm repo `nathanha2808-hub/Ch-i-App`
3. Click **"Set up build"**
4. Codemagic phát hiện `codemagic.yaml` ở root → ✅ tự dùng config
5. Click **"Use codemagic.yaml"**

### A3. Trigger first build (ios-verify)

Workflow `ios-verify` đã được setup để **auto-trigger** mỗi push lên branch `main` hoặc `feature/*` / `fix/*`.

Cách 1: **Push commit nào đó** → Codemagic auto-trigger.

Cách 2: **Manual trigger** (recommend cho test lần đầu):
1. Codemagic dashboard → app **Ch-i-App** → tab **Builds**
2. Click **"Start new build"** (góc trên phải)
3. Chọn:
   - Branch: `main`
   - Workflow: **"iOS Verify Build (no signing)"**
4. Click **"Start new build"**

### A4. Monitor build

Codemagic Mac Mini M2 free tier sẽ chạy 6 bước (~5-8 phút):
1. ✅ Install Capacitor deps (npm ci, ~30s)
2. ✅ Generate app icon (nếu chưa có)
3. ✅ Capacitor sync iOS
4. ✅ CocoaPods install (~1-2 phút lần đầu, cached cho lần sau)
5. ✅ Build .app for simulator (no signing) (~3-5 phút)
6. ✅ Email notification + artifact

### A5. Kết quả

Build success → **Artifacts** tab có file `App.app` (folder).

⚠️ **`.app` này KHÔNG cài được lên iPhone thật** — chỉ chạy trên iOS Simulator (cần Mac).

→ Mục đích: verify project compile OK, code không lỗi. Sau bước này có thể yên tâm proceed.

---

## Phase B — Setup Apple Developer (1-3 ngày verify Apple)

### B1. Đăng ký Apple Developer Program

1. **https://developer.apple.com/programs/enroll/**
2. Sign in với Apple ID `trantunglam2025@gmail.com` (sau khi đã đổi password!)
3. Chọn enrollment type:
   - **Individual** (đơn giản, không cần D-U-N-S)
   - Organization (cần D-U-N-S Number free apply 1-2 tuần)
4. Verify identity:
   - Upload ảnh CMND/CCCD mặt trước + sau
   - Selfie chân dung
   - Đợi Apple verify 24-48 giờ
5. Trả **$99 USD** (annual)
6. Apple email confirm → enrollment active

### B2. Note Apple Team ID

Sau khi enrollment active:
1. **https://developer.apple.com/account**
2. Click **"Membership"** sidebar
3. Copy **Team ID** (10 chars, vd `ABCD1234EF`)
4. **CHO TÔI Team ID** → tôi tạo file `apple-app-site-association` để bật Universal Links

### B3. Tạo App ID

1. Apple Developer Portal → **Certificates, Identifiers & Profiles**
2. **Identifiers** → ➕ → chọn **App IDs** → **App**
3. Fill:
   - **Description**: `Chi Oi Mobile`
   - **Bundle ID**: ✅ **Explicit** → `vn.chioi.app`
4. **Capabilities** — check:
   - ✅ Push Notifications
   - ✅ Associated Domains
   - ✅ Sign in with Apple (recommend nếu app có social login)
5. **Continue** → **Register**

### B4. Generate App Store Connect API Key (cho Codemagic)

1. **https://appstoreconnect.apple.com/access/integrations/api**
2. Tab **App Store Connect API** → ➕ **Generate API Key**
3. Fill:
   - Name: `Codemagic CI/CD`
   - Access: **App Manager** (đủ quyền upload TestFlight)
4. **Generate** → download file `AuthKey_XXXXXXX.p8`

⚠️ **Chỉ download được 1 lần!** Lưu vào password manager + USB backup.

5. Note 3 giá trị:
   - **Key ID** (10 chars): hiển thị trên bảng API keys, vd `ABCD1234EF`
   - **Issuer ID** (UUID): hiển thị top page, vd `12345678-aaaa-bbbb-cccc-dddddddddddd`
   - **Private Key file**: `AuthKey_XXXXXXX.p8` text content

### B5. Tạo App trong App Store Connect

1. **https://appstoreconnect.apple.com** → **My Apps** → ➕ → **New App**
2. Fill:
   - **Platforms**: iOS
   - **Name**: `Chị Ơi! — Dịch vụ giúp việc` (max 30 chars)
   - **Primary language**: Vietnamese
   - **Bundle ID**: chọn `vn.chioi.app` (từ App ID đã tạo)
   - **SKU**: `CHIOI-IOS-001`
   - **User Access**: Full Access
3. **Create**

4. Sau khi tạo, click app → **App Information** → General → copy **Apple ID** (numeric 10-digit, vd `6740000000`).
   **CHO TÔI số này** → tôi cập nhật `codemagic.yaml` field `APP_STORE_APPLE_ID`.

---

## Phase C — Connect Codemagic ↔ Apple Developer

### C1. Add App Store Connect Integration

1. Codemagic dashboard → góc trên phải avatar → **Teams** → chọn team (hoặc Personal)
2. **Integrations** tab → tìm **"App Store Connect"** → click **"Add"** hoặc **"Connect"**
3. Fill:
   - **Integration name**: `chioi-app-store-key` (PHẢI match với `codemagic.yaml`)
   - **Issuer ID**: paste UUID từ B4
   - **Key ID**: paste 10-char từ B4
   - **API key**: chọn file `.p8` đã download → paste **toàn bộ nội dung** (kể cả `-----BEGIN ...-----` headers)
4. Click **"Save"**
5. Codemagic test connection → ✅ verified

### C2. (Optional) Connect Apple Developer Portal

Codemagic có thể auto-manage signing certs nếu kết nối Apple Developer Account:
1. **Teams** → **Code signing identities** → **Apple Developer Portal**
2. Click **"Connect"** → Sign in Apple ID (trantunglam2025@gmail.com)
3. Authorize → done

(Optional vì C1 đã đủ cho auto-managed signing.)

### C3. (Cần làm sau khi app đã có TestFlight build) Tạo Beta tester group

1. App Store Connect → app **Chị Ơi!** → **TestFlight** → **Internal Testing**
2. ➕ **Create Group** → name: `Internal Testers`
3. Add testers: paste email Apple ID của team (max 100)

⚠️ Tên group phải match với `codemagic.yaml` `beta_groups: - "Internal Testers"`.

---

## Phase D — Production build TestFlight

### D1. Tag push để trigger

Trên máy local:
```bash
cd "D:\New folder\Ch-i-App"
git tag -a v1.0.0 -m "iOS first release"
git push origin v1.0.0
```

Workflow `ios-release-store` auto-trigger (pattern `v[0-9]+.[0-9]+.[0-9]+`).

### D2. Monitor

Codemagic dashboard → builds → workflow **"iOS Release → TestFlight"**.

6 steps (~10-15 phút):
1. Setup keychain + signing
2. Install deps + sync iOS
3. CocoaPods install
4. Bump build number (auto-fetch latest từ App Store Connect)
5. Build Release IPA + dSYM
6. **Upload TestFlight** automatically

### D3. Test trên iPhone

Sau khi build xong (success):
1. **App Store Connect** → **TestFlight** → thấy build mới
2. Status: **Processing** (~30 phút) → **Ready to Test**
3. Mời tester qua email → tester cài app **TestFlight** từ App Store → nhận invite link → cài Chị Ơi!

### D4. Production submit (manual)

Khi đã test TestFlight OK:
1. App Store Connect → app → **iOS App** version `1.0.0`
2. Tab **Build** → chọn TestFlight build
3. Save → **Add for Review** → **Submit for Review**
4. Apple review **24-48h** → approved → live App Store

---

## Phase E — Update flow sau này

### Cách build version mới (vd v1.0.1)

```bash
# 1. Bump version trong twa-manifest.json (chỉ cho Android nếu cần)
# 2. Cập nhật mobile-ios/ios/App/App.xcodeproj/project.pbxproj — agvtool tự bump
# 3. Commit + push code thay đổi
git add .
git commit -m "feat: ..."
git push origin main

# 4. Tag mới
git tag -a v1.0.1 -m "Bug fixes"
git push origin v1.0.1

# 5. Codemagic auto-trigger → build → upload TestFlight
```

Build number auto-bump qua command:
```bash
agvtool new-version -all $(($(app-store-connect get-latest-app-store-build-number "$APP_STORE_APPLE_ID") + 1))
```

→ Mỗi release đều có versionCode mới (1, 2, 3...) thoả mãn Apple yêu cầu.

---

## Troubleshooting

### Build fail "No matching provisioning profiles"
- Verify integration name trong `codemagic.yaml` match với tên trong Codemagic UI
- Verify Bundle ID `vn.chioi.app` đã tạo trong Apple Developer Portal
- Re-fetch certs: Codemagic Teams → Code signing identities → Refresh

### Build fail "Pod install failed"
- Codemagic instance đôi khi gặp CocoaPods cache lỗi
- Re-trigger build → thường resolved
- Hoặc add `pod repo update` trước install

### TestFlight build stuck "Processing"
- Đợi 30-60 phút (đôi khi 24h cho lần đầu)
- Apple sẽ email nếu reject (kèm lý do)

### Email "Invalid Apple ID" khi upload TestFlight
- Verify `APP_STORE_APPLE_ID` trong `codemagic.yaml` đúng 10-digit từ App Store Connect → App Info

### Free tier hết 500 phút/tháng
- Upgrade Standard ($28/tháng, 1500 phút) hoặc đợi sang tháng sau
- Hoặc tự host Mac runner (Codemagic Self-Hosted)

---

## ✅ Action checklist cho user

### Hôm nay (15-30 phút, không cần Apple Dev)
- [ ] Đổi password Apple ID + GitHub (đã share trong chat)
- [ ] Bật 2FA
- [ ] Đăng ký Codemagic free tier
- [ ] Connect repo Ch-i-App
- [ ] Trigger ios-verify workflow → verify build PASS
- [ ] (Optional) Test artifact `.app` qua Mac Simulator

### Tuần này (cần Apple Dev signup)
- [ ] Đăng ký Apple Developer Program ($99)
- [ ] Verify identity (1-3 ngày)
- [ ] Tạo App ID `vn.chioi.app`
- [ ] Generate App Store Connect API key `.p8`
- [ ] Tạo app trong App Store Connect + note Apple ID number
- [ ] Setup Codemagic integration `chioi-app-store-key`
- [ ] Cập nhật `codemagic.yaml`:
  - `APP_STORE_APPLE_ID`: 10-digit number
  - `recipients`: email của bạn
- [ ] **Cho tôi**:
  - Apple Team ID (10 chars) → tôi tạo `apple-app-site-association`
  - App Store Apple ID (10-digit) → tôi update `codemagic.yaml` chuẩn

### Sau khi đủ chuẩn bị
- [ ] Tạo Internal Testers group trong App Store Connect TestFlight
- [ ] Push tag `v1.0.0` → Codemagic auto-build IPA → TestFlight
- [ ] Test trên iPhone qua TestFlight
- [ ] Prepare App Store assets (1024×1024 icon, screenshots, feature graphic, description)
- [ ] Submit Production review

---

## 🆘 Cứ ping khi gặp vấn đề

Tôi có thể giúp:
- Debug Codemagic build error từ build log
- Tạo `apple-app-site-association` khi có Team ID
- Update `codemagic.yaml` khi có Apple credentials
- Generate App Store assets (icon variants, screenshot templates)
- Setup auto-deploy CI/CD song song Android + iOS
- Resolve App Store review rejection (4.2 minimum functionality, etc.)
