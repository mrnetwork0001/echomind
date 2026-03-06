# EchoMind 

EchoMind is a decentralized AI assistant built on the **OpenGradient** network. It leverages **Verifiable Inference** through Trusted Execution Environments (TEEs) to provide secure, private, and transparent AI interactions. By integrating **MemSync**, EchoMind maintains a persistent, decentralized memory of user technical interests and past conversations.

---

##  Key Features

* **Verifiable AI Inference**: Powered by the OpenGradient SDK using the `GEMINI_2_5_FLASH` model running in a TEE.
* **Decentralized Long-term Memory**: Uses MemSync API to store and retrieve user-specific context, ensuring the AI "remembers" you without centralized data silos.
* **Secure Backend**: Built with FastAPI and orchestrated on a VPS with screen-managed sessions for high availability.
* **Modern Frontend**: A responsive UI built with Lovable for seamless user interaction.

---

##  Technical Stack

| Component | Technology |
| :--- | :--- |
| **Language** | Python 3.12+ |
| **API Framework** | FastAPI |
| **Blockchain/AI** | OpenGradient SDK (Base Sepolia) |
| **Memory Layer** | MemSync (Decentralized Vector Storage) |
| **Server** | Uvicorn |
| **Orchestration** | Linux Screen |

---

##  Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/mrnetwork0001/echomind.git](https://github.com/mrnetwork0001/echomind.git)
   cd echomind

**2. Set up a Virtual Environment:**
   ```bash
   python3 -m venv venv
source venv/bin/activate
