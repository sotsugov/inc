# Increment

![dashboard!](assets/dash.png)

Increment is a proof-of-concept LLM request cost estimation tool. It demonstrates rapid MVP development through pragmatic trade-offs and assumptions. Built using real data APIs and robust backend calculation logic, it helps developers and product managers predict the cost of using APIs for text-based AI interactions. The dashboard analyses input/output tokens to calculate potential costs, and provides visualisations and breakdowns of usage patterns. Currently, a demo, it shows key features such as interactive cost analysis charts, usage reports and predictive calculations based on historical data. The project emphasises practical development priorities - implementing core functionality and data handling while maintaining a foundation for future testing and scalability.

## Getting Started

## Backend
FastAPI for backend

```
/api/v1/* routes to the API server
/api/docs to the FastAPI documentation
/api/openapi.json to the OpenAPI schema
```

### Development
First, create and activate a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

### Testing
Testing backend with pytest:

```bash
# Add the project root to PYTHONPATH
export PYTHONPATH=$PYTHONPATH:$(pwd)
pnpm test:be
```

## Frontend
Next.JS with shadcn for frontend

### Development

```bash
# frontend only
pnpm next-dev

# both fe and be
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Testing
Testing frontend with jest:

```bash
pnpm test:fe
```
