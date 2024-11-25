# FE-GlowUp

## Project structure

Reusable UI components based on the [Atomic design](https://atomicdesign.bradfrost.com/chapter-2/)

Note: In the below description of the project structure, there is no a `pages` directory. However, we still have and apply `pages` of atomic design in our project.
Because the expo-router navigates based on the file under the app directory, the `pages` of atomic design will be files that are represented for `pages` under `app` folder.
 https://atomicdesign.bradfrost.com/chapter-2/#pages

```
├── app/
│   ├── GlowUp/   
│   │   ├── index.tsx
│   └── index.tsx
├── components/          # Reusable UI components  
│   ├── templates/   
│   ├── organisms/   
│   ├── molecules/   
│   ├── atoms/   
├── hooks
│   ├── useDevice.ts
├── features
│   ├── deviceSlice.ts
│
│── assets/                  # Images, fonts, and other static assets
│
│── constants/               # constant values
```

<div align="center">
  <h2>🌟 <b>Project Team Members</b> 🌟</h2>
  <table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; border-color: #ddd; background-color: #f9f9f9;">
    <thead>
      <tr style="background-color: #4CAF50; color: white;">
        <th colspan="4">🎨 <b>Team Frontend</b> 🎨</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align="center"><a href="https://github.com/NguyenVanViet2004"><img src="https://avatars.githubusercontent.com/u/132866307?v=4" width="100px;" alt=""/><br /><sub><b>Nguyễn Văn Việt</b></sub></a><br /><br />
          ⭐ 🧑‍💼 Lead Frontend<br />
          🔹 👨‍💻 Frontend Developer<br />
          🔹 🎨 UI/UX Designer<br />
          🔹 🛠️ Frontend Tester
        </td>
        <td align="center"><a href="https://github.com/truongtdph40209"><img src="https://avatars.githubusercontent.com/u/149360446?v=4" width="100px;" alt=""/><br /><sub><b>Trịnh Đình Trường</b></sub></a><br /><br />
          🔹 👨‍💻 Frontend Developer<br />
          🔹 🛠️ Frontend Tester
        </td>
        <td align="center"><a href="https://github.com/thanhdo29"><img src="https://avatars.githubusercontent.com/u/133109642?v=4" width="100px;" alt=""/><br /><sub><b>Thanh Do Tuan</b></sub></a><br /><br />
          🔹 👨‍💻 Frontend Developer<br />
          🔹 🛠️ Frontend Tester
        </td>
        <td align="center"><a href="https://github.com/KMTus"><img src="https://avatars.githubusercontent.com/u/130027866?v=4" width="100px;" alt=""/><br /><sub><b>KMTus</b></sub></a><br /><br />
          🔹 👨‍💻 Frontend Developer<br />
          🔹 🛠️ Frontend Tester<br />
          🔹 🎨 UI/UX Designer<br />
          🔹 📑 Documentation & Diagrams
        </td>
      </tr>
    </tbody>
    <thead>
      <tr style="background-color: #2196F3; color: white;">
        <th colspan="4">⚙️ <b>Team Backend</b> ⚙️</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align="center" colspan="2"><a href="https://github.com/mwarevn"><img src="https://avatars.githubusercontent.com/u/124526287?v=4" width="100px;" alt=""/><br /><sub><b>MWare CEO</b></sub></a><br /><br />
          🔹 🏗️ Backend Architect
        </td>
        <td align="center" colspan="2"><a href="https://github.com/Minhdd15112003"><img src="https://avatars.githubusercontent.com/u/139239663?v=4" width="100px;" alt=""/><br /><sub><b>Đào Duy Minh</b></sub></a><br /><br />
          🔹 🗄️ Database Engineer
        </td>
      </tr>
    </tbody>
    <thead>
      <tr style="background-color: #FFC107; color: black;">
        <th colspan="4">🌐 <b>Cross-team Contributor</b> 🌐</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="4" align="center"><a href="https://github.com/Thinh134"><img src="https://avatars.githubusercontent.com/u/118526340?v=4" width="100px;" alt=""/><br /><sub><b>Thinh134</b></sub></a><br /><br />
          🔹 🌍 Full Stack Developer<br />
          🔹 📑 Code, Documentation & Diagrams
        </td>
      </tr>
    </tbody>
  </table>
  <br />
  <p><i>✨ Created with teamwork and passion! ✨</i></p>
</div>
