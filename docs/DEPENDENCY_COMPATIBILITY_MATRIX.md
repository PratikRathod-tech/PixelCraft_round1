# Phase 1L — Ecosystem Dependency & Runtime Compatibility Matrix

- **Audit Date & Timestamp**: 2026-10-03 16:16:12 +0530
- **Environments Inspected**: Python Virtual Environment (`AI_ML_Mule_Account_Research/.venv`) & Node.js Platform (`Pixel/package.json`, `Pixel/server/package.json`)
- **Status**: Verified Operational (Zero Conflicts)

---

## 1. Python Environment Specifications (`.venv`)

| Package Name | Installed Version | Role in Ecosystem | Compatibility & Runtime Notes |
|---|---|---|---|
| **Python Runtime** | `3.14.0a3` | Core execution engine | Modern 64-bit Windows build. All tests pass without deprecation crashes. |
| **PyTorch (`torch`)** | `2.6.0+cpu` | Neural network computation | In PyTorch 2.6+, `torch.load` defaults to `weights_only=True`. Serialized checkpoints containing custom metadata or `TorchVersion` objects must be loaded using `weights_only=False` or registered safe globals. |
| **NetworkX** | `3.4.2` | Graph construction & BFS | Implements `MultiDiGraph` for 157k AML transaction edges. Fully compatible with Python 3.14. |
| **Pandas** | `2.2.3` | Tabular data & CSV/Parquet I/O | PyArrow backend supported. Reads 157k rows in < 150ms. |
| **NumPy** | `2.2.2` | Numerical tensor operations | C-API ABI compatible with installed PyTorch CPU wheel. |
| **Scikit-Learn** | `1.6.1` | Preprocessing & evaluation metrics| RobustScaler, StandardScaler, train_test_split, ROC/AUC, Precision/Recall. |
| **PyArrow** | `19.0.0` | Fast Parquet read/write | Parquet persistence for DMLRank consolidated features and pair datasets. |
| **Pytest** | `8.3.4` | Automated test runner | Successfully executes all 339 tests in `AI_ML_Mule_Account_Research/09_Tests`. |

---

## 2. Web Engineering & Node Environment Specifications (`Pixel`)

| Tier | Package | Specified Version | Operational Role | Health / Verification Status |
|---|---|---|---|---|
| **Runtime** | Node.js / npm | `v20+` / `v10+` | JavaScript engine & package manager | System runtime verified. |
| **Framework** | `react` / `react-dom` | `^18.3.1` | Frontend reactive view layer | React 18 concurrent mode enabled. |
| **Language** | `typescript` | `^5.5.3` | Static typing & interface validation | Strict mode active; `npm run lint` passes with 0 errors. |
| **Bundler** | `vite` | `^6.1.0` | Next-generation ESM bundler | Builds `dist/` in 30.38s (2,738 modules). |
| **Styling** | `tailwindcss` | `@tailwindcss/vite ^4.0.6` | Utility-first CSS styling | Tailwind 4 native Vite plugin active. |
| **3D Engine** | `three` | `^0.173.0` | WebGL 3D rendering pipeline | Scene, Cameras, Shaders, InstancedMesh. |
| **React 3D** | `@react-three/fiber` | `^8.17.14` | Declarative R3F Canvas bindings | Connects Three.js scene graph to React state. |
| **R3F Helpers** | `@react-three/drei` | `^9.121.4` | OrbitControls, Html overlays, helpers| Camera manipulation and 3D tooltips. |
| **Icons** | `lucide-react` | `^0.475.0` | Clean SVG icon set | AML status icons, network nodes, alerts. |
| **State** | `zustand` | `^5.0.3` | Lightweight state store | Manages selected account, filters, viewport state. |
| **Backend API** | `express` | `^5.2.1` | REST server (`server/index.js`) | Express 5 with native async/await promise handling. |
| **CORS** | `cors` | `^2.8.5` | Cross-Origin middleware | Connects Express (port 3001) to Vite (port 5173). |

---

## 3. Cross-Tier Compatibility Analysis & Architectural Guardrails

1. **Python ↔ Node Communication**:
   - The web tier (`Pixel`) runs on Node.js/Express, while the ML algorithms (`MuleTrace`, `DMLRank`) execute in Python.
   - Target bridge: Fast JSON REST API or local subprocess bridge between Express 5 (`server/index.js`) and Python virtual environment (`.venv/Scripts/python.exe`).
2. **PyTorch 2.6 Serialization Guardrail**:
   - Model checkpoints (`bgrl_amlpublic_checkpoint.pt`) contain custom dictionary structures.
   - Inference scripts must use `torch.load(..., weights_only=False)` or whitelist `torch.torch_version.TorchVersion` via `add_safe_globals`.
3. **Zero Native Build Dependencies Required**:
   - Both the Python environment and Node frontend avoid complex uncompiled C++ dependencies that could break during cross-platform deployment.
