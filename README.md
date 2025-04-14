# Kubernetes Mini Project with Minikube

This project demonstrates basic Kubernetes operations using Minikube.

## Prerequisites
- Minikube installed
- kubectl configured
- Node.js 20+
- Docker
- Git

### Local Development
```bash
git clone https://github.com/yourusername/simple-todo-app.git
cd simple-todo-app
npm install
npm start
```

## Steps

### 1. Start Minikube and Cluster
```bash
minikube start
```
### 2. Create pods for your app and apply it:
```bash
kubectl apply -f pod.yaml
```
### 3. Create Deployment
Create deployment.yaml for your app and apply it:
```bash
kubectl apply -f deployment.yaml
```
### 4. Expose the App
Create service.yaml to expose your app:
```bash
kubectl apply -f service.yaml
```

### 5. Verify Pods
Check running pods:
```bash
kubectl get pods
```

### 6. Accessing the Application

To open your exposed service in a web browser, use:
```bash
minikube service your-service-name
```

### 7. View Logs
```bash
kubectl describe pods/<pod-name>
```
### 8. For scaleup application
```bash
kubectl scale deployment/<deployment-name> --replicas=3
```
### 9. CleanUp
```bash
minikube stop
minikube delete
```


## 🤝 Contributing
- Fork the project

- Create your feature branch (git checkout -b feature/AmazingFeature)

- Commit your changes (git commit -m 'Add some amazing feature')

- Push to the branch (git push origin feature/AmazingFeature)

- Open a Pull Request

## 📬 Contact

Md Shadab Alam  - hashmishadab024@gmail.com

mob- 9128051972
