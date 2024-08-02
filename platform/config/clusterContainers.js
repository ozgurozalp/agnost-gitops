export const clusterContainers = [
	{
		iid: "platform",
		name: "platform",
		slug: "platform",
		type: "deployment",
		pipelineStatus: "Disconnected",
		variables: [
			{ name: "CACHE_HOSTNAME", value: process.env.CACHE_HOSTNAME },
			{ name: "CACHE_PWD", value: process.env.CACHE_PWD },
			{ name: "CLUSTER_DB_URI", value: process.env.CLUSTER_DB_URI },
			{ name: "CLUSTER_DB_USER", value: process.env.CLUSTER_DB_USER },
			{ name: "CLUSTER_DB_PWD", value: process.env.CLUSTER_DB_PWD },
			{ name: "PASSPHRASE", value: process.env.PASSPHRASE },
			{ name: "CLUSTER_ACCESS_TOKEN", value: process.env.CLUSTER_ACCESS_TOKEN },
			{ name: "MASTER_TOKEN", value: process.env.MASTER_TOKEN },
			{ name: "CLUSTER_SLUG", value: process.env.CLUSTER_SLUG },
			{ name: "GROUP_NAME", value: process.env.GROUP_NAME },
			{ name: "SOLVER_NAME", value: process.env.SOLVER_NAME },
			{ name: "MINIO_ENDPOINT", value: process.env.MINIO_ENDPOINT },
			{ name: "MINIO_PORT", value: process.env.MINIO_PORT },
			{ name: "MINIO_ACCESS_KEY", value: process.env.MINIO_ACCESS_KEY },
			{ name: "MINIO_SECRET_KEY", value: process.env.MINIO_SECRET_KEY },
			{ name: "WEBHOOK_NAMESPACE", value: process.env.WEBHOOK_NAMESPACE },
			{ name: "WEBHOOK_SERVICE", value: process.env.WEBHOOK_SERVICE },
			{ name: "NAMESPACE", value: process.env.NAMESPACE },
			{ name: "NGINX_NAMESPACE", value: process.env.NGINX_NAMESPACE },
			{
				name: "CERT_MANAGER_NAMESPACE",
				value: process.env.CERT_MANAGER_NAMESPACE,
			},
			{ name: "RELEASE_NUMBER", value: process.env.RELEASE_NUMBER },
		],
		repoOrRegistry: "registry",
		registry: {
			imageUrl: "europe-docker.pkg.dev/agnost-gitops/images/platform:latest",
		},
		networking: {
			containerPort: 4000,
			ingress: {
				enabled: true,
				type: "path",
				path: "api",
			},
			customDomain: {
				enabled: false,
			},
			tcpProxy: {
				enabled: false,
			},
		},
		podConfig: {
			restartPolicy: "Always",
			cpuRequest: 100,
			cpuRequestType: "millicores",
			cpuLimit: 500,
			cpuLimitType: "millicores",
			memoryRequest: 128,
			memoryRequestType: "mebibyte",
			memoryLimit: 256,
			memoryLimitType: "mebibyte",
		},
		storageConfig: {
			enabled: false,
			size: 1,
			sizeType: "gibibyte",
			accessModes: ["ReadWriteOnce"],
		},
		deploymentConfig: {
			desiredReplicas: 1,
			minReplicas: 1,
			maxReplicas: 5,
			cpuMetric: {
				enabled: true,
				metricType: "AverageUtilization",
				metricValue: 80,
			},
			memoryMetric: {
				enabled: true,
				metricType: "AverageValueMebibyte",
				metricValue: 100,
			},
			strategy: "RollingUpdate",
			rollingUpdate: {
				maxSurge: 30,
				maxSurgeType: "percentage",
				maxUnavailable: 0,
				maxUnavailableType: "number",
			},
			revisionHistoryLimit: 10,
		},
		probes: {
			startup: {
				enabled: true,
				checkMechanism: "httpGet",
				httpPath: "/health",
				httpPort: 4000,
				initialDelaySeconds: 10,
				periodSeconds: 30,
				timeoutSeconds: 5,
				failureThreshold: 30,
			},
			readiness: {
				enabled: false,
				checkMechanism: "httpGet",
				httpPath: "/health",
				httpPort: 4000,
				initialDelaySeconds: 10,
				periodSeconds: 30,
				timeoutSeconds: 5,
				failureThreshold: 3,
			},
			liveness: {
				enabled: true,
				checkMechanism: "httpGet",
				httpPath: "/health",
				httpPort: 4000,
				initialDelaySeconds: 10,
				periodSeconds: 30,
				timeoutSeconds: 5,
				failureThreshold: 3,
			},
		},
	},
	{
		iid: "agnost-webhook",
		name: "agnost-webhook",
		slug: "agnost-webhook",
		type: "deployment",
		pipelineStatus: "Disconnected",
		variables: [
			{ name: "GROUP_NAME", value: process.env.GROUP_NAME },
			{ name: "SOLVER_NAME", value: process.env.SOLVER_NAME },
			{ name: "RELEASE_NUMBER", value: process.env.RELEASE_NUMBER },
		],
		repoOrRegistry: "registry",
		registry: {
			imageUrl: "europe-docker.pkg.dev/agnost-gitops/images/webhook:latest",
		},
		networking: {
			containerPort: 443,
			ingress: {
				enabled: false,
			},
			customDomain: {
				enabled: false,
			},
			tcpProxy: {
				enabled: false,
			},
		},
		podConfig: {
			restartPolicy: "Always",
			cpuRequest: 100,
			cpuRequestType: "millicores",
			cpuLimit: 500,
			cpuLimitType: "millicores",
			memoryRequest: 128,
			memoryRequestType: "mebibyte",
			memoryLimit: 512,
			memoryLimitType: "mebibyte",
		},
		storageConfig: {
			enabled: false,
			size: 1,
			sizeType: "gibibyte",
			accessModes: ["ReadWriteOnce"],
		},
		deploymentConfig: {
			desiredReplicas: 1,
			minReplicas: 1,
			maxReplicas: 1,
			cpuMetric: {
				enabled: false,
				metricType: "AverageUtilization",
				metricValue: 80,
			},
			memoryMetric: {
				enabled: false,
				metricType: "AverageValueMebibyte",
				metricValue: 100,
			},
			strategy: "RollingUpdate",
			rollingUpdate: {
				maxSurge: 25,
				maxSurgeType: "percentage",
				maxUnavailable: 25,
				maxUnavailableType: "percentage",
			},
			revisionHistoryLimit: 10,
		},
		probes: {
			startup: {
				enabled: false,
				checkMechanism: "httpGet",
				httpPath: "/healthz",
				httpPort: 443,
				initialDelaySeconds: 10,
				periodSeconds: 30,
				timeoutSeconds: 5,
				failureThreshold: 30,
			},
			readiness: {
				enabled: true,
				checkMechanism: "httpGet",
				httpPath: "/healthz",
				httpPort: 443,
				initialDelaySeconds: 10,
				periodSeconds: 30,
				timeoutSeconds: 5,
				failureThreshold: 3,
			},
			liveness: {
				enabled: true,
				checkMechanism: "httpGet",
				httpPath: "/healthz",
				httpPort: 443,
				initialDelaySeconds: 10,
				periodSeconds: 30,
				timeoutSeconds: 5,
				failureThreshold: 3,
			},
		},
	},
	{
		iid: "sync",
		name: "sync",
		slug: "sync",
		type: "deployment",
		pipelineStatus: "Disconnected",
		variables: [
			{ name: "CACHE_HOSTNAME", value: process.env.CACHE_HOSTNAME },
			{ name: "CACHE_PWD", value: process.env.CACHE_PWD },
			{ name: "NAMESPACE", value: process.env.NAMESPACE },
			{ name: "RELEASE_NUMBER", value: process.env.RELEASE_NUMBER },
		],
		repoOrRegistry: "registry",
		registry: {
			imageUrl: "europe-docker.pkg.dev/agnost-gitops/images/sync:latest",
		},
		networking: {
			containerPort: 4000,
			ingress: {
				enabled: true,
				type: "path",
				path: "sync",
			},
			customDomain: {
				enabled: false,
			},
			tcpProxy: {
				enabled: false,
			},
		},
		podConfig: {
			restartPolicy: "Always",
			cpuRequest: 100,
			cpuRequestType: "millicores",
			cpuLimit: 500,
			cpuLimitType: "millicores",
			memoryRequest: 128,
			memoryRequestType: "mebibyte",
			memoryLimit: 256,
			memoryLimitType: "mebibyte",
		},
		storageConfig: {
			enabled: false,
			size: 1,
			sizeType: "gibibyte",
			accessModes: ["ReadWriteOnce"],
		},
		deploymentConfig: {
			desiredReplicas: 1,
			minReplicas: 1,
			maxReplicas: 5,
			cpuMetric: {
				enabled: true,
				metricType: "AverageUtilization",
				metricValue: 80,
			},
			memoryMetric: {
				enabled: true,
				metricType: "AverageValueMebibyte",
				metricValue: 100,
			},
			strategy: "RollingUpdate",
			rollingUpdate: {
				maxSurge: 30,
				maxSurgeType: "percentage",
				maxUnavailable: 0,
				maxUnavailableType: "number",
			},
			revisionHistoryLimit: 10,
		},
		probes: {
			startup: {
				enabled: true,
				checkMechanism: "httpGet",
				httpPath: "/health",
				httpPort: 4000,
				initialDelaySeconds: 10,
				periodSeconds: 30,
				timeoutSeconds: 5,
				failureThreshold: 30,
			},
			readiness: {
				enabled: false,
				checkMechanism: "httpGet",
				httpPath: "/health",
				httpPort: 4000,
				initialDelaySeconds: 10,
				periodSeconds: 30,
				timeoutSeconds: 5,
				failureThreshold: 3,
			},
			liveness: {
				enabled: true,
				checkMechanism: "httpGet",
				httpPath: "/health",
				httpPort: 4000,
				initialDelaySeconds: 10,
				periodSeconds: 30,
				timeoutSeconds: 5,
				failureThreshold: 3,
			},
		},
	},
	{
		iid: "studio",
		name: "studio",
		slug: "studio",
		type: "deployment",
		pipelineStatus: "Disconnected",
		variables: [
			{ name: "NAMESPACE", value: process.env.NAMESPACE },
			{ name: "RELEASE_NUMBER", value: process.env.RELEASE_NUMBER },
		],
		repoOrRegistry: "registry",
		registry: {
			imageUrl: "europe-docker.pkg.dev/agnost-gitops/images/studio:latest",
		},
		networking: {
			containerPort: 4000,
			ingress: {
				enabled: true,
				type: "path",
				path: "studio",
			},
			customDomain: {
				enabled: false,
			},
			tcpProxy: {
				enabled: false,
			},
		},
		podConfig: {
			restartPolicy: "Always",
			cpuRequest: 100,
			cpuRequestType: "millicores",
			cpuLimit: 500,
			cpuLimitType: "millicores",
			memoryRequest: 128,
			memoryRequestType: "mebibyte",
			memoryLimit: 256,
			memoryLimitType: "mebibyte",
		},
		storageConfig: {
			enabled: false,
			size: 1,
			sizeType: "gibibyte",
			accessModes: ["ReadWriteOnce"],
		},
		deploymentConfig: {
			desiredReplicas: 1,
			minReplicas: 1,
			maxReplicas: 5,
			cpuMetric: {
				enabled: true,
				metricType: "AverageUtilization",
				metricValue: 80,
			},
			memoryMetric: {
				enabled: true,
				metricType: "AverageValueMebibyte",
				metricValue: 100,
			},
			strategy: "RollingUpdate",
			rollingUpdate: {
				maxSurge: 30,
				maxSurgeType: "percentage",
				maxUnavailable: 0,
				maxUnavailableType: "number",
			},
			revisionHistoryLimit: 10,
		},
		probes: {
			startup: {
				enabled: false,
				checkMechanism: "httpGet",
				httpPath: "/health",
				httpPort: 4000,
				initialDelaySeconds: 10,
				periodSeconds: 30,
				timeoutSeconds: 5,
				failureThreshold: 30,
			},
			readiness: {
				enabled: false,
				checkMechanism: "httpGet",
				httpPath: "/health",
				httpPort: 4000,
				initialDelaySeconds: 10,
				periodSeconds: 30,
				timeoutSeconds: 5,
				failureThreshold: 3,
			},
			liveness: {
				enabled: false,
				checkMechanism: "httpGet",
				httpPath: "/health",
				httpPort: 4000,
				initialDelaySeconds: 10,
				periodSeconds: 30,
				timeoutSeconds: 5,
				failureThreshold: 3,
			},
		},
	},
	{
		iid: "monitor",
		name: "monitor",
		slug: "monitor",
		type: "deployment",
		pipelineStatus: "Disconnected",
		variables: [
			{ name: "CLUSTER_DB_URI", value: process.env.CLUSTER_DB_URI },
			{ name: "CLUSTER_DB_USER", value: process.env.CLUSTER_DB_USER },
			{ name: "CLUSTER_DB_PWD", value: process.env.CLUSTER_DB_PWD },
			{ name: "PASSPHRASE", value: process.env.PASSPHRASE },
			{ name: "MASTER_TOKEN", value: process.env.MASTER_TOKEN },
			{ name: "NAMESPACE", value: process.env.NAMESPACE },
			{ name: "RELEASE_NUMBER", value: process.env.RELEASE_NUMBER },
		],
		repoOrRegistry: "registry",
		registry: {
			imageUrl: "europe-docker.pkg.dev/agnost-gitops/images/monitor:latest",
		},
		networking: {
			containerPort: 4000,
			ingress: {
				enabled: false,
			},
			customDomain: {
				enabled: false,
			},
			tcpProxy: {
				enabled: false,
			},
		},
		podConfig: {
			restartPolicy: "Always",
			cpuRequest: 100,
			cpuRequestType: "millicores",
			cpuLimit: 500,
			cpuLimitType: "millicores",
			memoryRequest: 128,
			memoryRequestType: "mebibyte",
			memoryLimit: 256,
			memoryLimitType: "mebibyte",
		},
		storageConfig: {
			enabled: false,
			size: 1,
			sizeType: "gibibyte",
			accessModes: ["ReadWriteOnce"],
		},
		deploymentConfig: {
			desiredReplicas: 1,
			minReplicas: 1,
			maxReplicas: 1,
			cpuMetric: {
				enabled: false,
				metricType: "AverageUtilization",
				metricValue: 80,
			},
			memoryMetric: {
				enabled: false,
				metricType: "AverageValueMebibyte",
				metricValue: 100,
			},
			strategy: "RollingUpdate",
			rollingUpdate: {
				maxSurge: 30,
				maxSurgeType: "percentage",
				maxUnavailable: 0,
				maxUnavailableType: "number",
			},
			revisionHistoryLimit: 10,
		},
		probes: {
			startup: {
				enabled: true,
				checkMechanism: "httpGet",
				httpPath: "/health",
				httpPort: 4000,
				initialDelaySeconds: 10,
				periodSeconds: 30,
				timeoutSeconds: 5,
				failureThreshold: 30,
			},
			readiness: {
				enabled: false,
				checkMechanism: "httpGet",
				httpPath: "/health",
				httpPort: 4000,
				initialDelaySeconds: 10,
				periodSeconds: 30,
				timeoutSeconds: 5,
				failureThreshold: 3,
			},
			liveness: {
				enabled: false,
				checkMechanism: "httpGet",
				httpPath: "/health",
				httpPort: 4000,
				initialDelaySeconds: 10,
				periodSeconds: 30,
				timeoutSeconds: 5,
				failureThreshold: 3,
			},
		},
	},
	{
		iid: "minio",
		slug: "minio",
		name: "minio",
		type: "statefulset",
		template: {
			name: "MinIO",
			manifest: "miniov1.0.yaml",
			version: "1.0",
		},
		pipelineStatus: "N/A",
		variables: [
			{
				name: "MINIO_ROOT_USER",
				value: process.env.MINIO_ACCESS_KEY,
			},
			{
				name: "MINIO_ROOT_PASSWORD",
				value: process.env.MINIO_SECRET_KEY,
			},
		],
		repoOrRegistry: "registry",
		registry: {
			imageUrl: "quay.io/minio/minio:RELEASE.2024-05-10T01-41-38Z",
		},
		networking: {
			containerPort: 9000,
			tcpProxy: {
				enabled: false,
			},
			ingress: {
				enabled: false,
			},
			customDomain: {
				enabled: false,
			},
		},
		podConfig: {
			restartPolicy: "Always",
			cpuRequest: 100,
			cpuRequestType: "millicores",
			memoryRequest: 256,
			memoryRequestType: "mebibyte",
			cpuLimit: 1,
			cpuLimitType: "cores",
			memoryLimit: 1,
			memoryLimitType: "gibibyte",
		},
		storageConfig: {
			enabled: true,
			mountPath: "/data",
			size: 10,
			sizeType: "gibibyte",
			accessModes: ["ReadWriteOnce"],
		},
		statefulSetConfig: {
			desiredReplicas: 1,
			persistentVolumeClaimRetentionPolicy: {
				whenDeleted: "Retain",
				whenScaled: "Retain",
			},
			strategy: "RollingUpdate",
			rollingUpdate: {
				maxUnavailable: 1,
				maxUnavailableType: "number",
				partition: 0,
			},
			revisionHistoryLimit: 10,
			podManagementPolicy: "OrderedReady",
		},
		probes: {
			startup: {
				enabled: false,
				initialDelaySeconds: 30,
				periodSeconds: 30,
				timeoutSeconds: 10,
				failureThreshold: 3,
			},
			readiness: {
				enabled: false,
				initialDelaySeconds: 30,
				periodSeconds: 30,
				timeoutSeconds: 10,
				failureThreshold: 3,
			},
			liveness: {
				enabled: false,
				initialDelaySeconds: 30,
				periodSeconds: 30,
				timeoutSeconds: 10,
				failureThreshold: 3,
			},
		},
	},
	{
		iid: "redis",
		slug: "redis",
		name: "redis",
		type: "statefulset",
		template: {
			name: "Redis",
			manifest: "redisv1.0.yaml",
			version: "1.0",
		},
		pipelineStatus: "N/A",
		variables: [
			{
				name: "REDIS_PASSWORD",
				value: process.env.CACHE_PWD,
			},
		],
		repoOrRegistry: "registry",
		registry: {
			imageUrl: "docker.io/redis:7.2.5",
		},
		networking: {
			containerPort: 6379,
			tcpProxy: {
				enabled: false,
			},
			ingress: {
				enabled: false,
			},
			customDomain: {
				enabled: false,
			},
		},
		podConfig: {
			restartPolicy: "Always",
			cpuRequest: 100,
			cpuRequestType: "millicores",
			memoryRequest: 256,
			memoryRequestType: "mebibyte",
			cpuLimit: 500,
			cpuLimitType: "millicores",
			memoryLimit: 512,
			memoryLimitType: "mebibyte",
		},
		storageConfig: {
			enabled: true,
			mountPath: "/data",
			size: 512,
			sizeType: "mebibyte",
			accessModes: ["ReadWriteOnce"],
		},
		statefulSetConfig: {
			desiredReplicas: 1,
			persistentVolumeClaimRetentionPolicy: {
				whenDeleted: "Retain",
				whenScaled: "Retain",
			},
			strategy: "RollingUpdate",
			rollingUpdate: {
				maxUnavailable: 1,
				maxUnavailableType: "number",
				partition: 0,
			},
			revisionHistoryLimit: 10,
			podManagementPolicy: "OrderedReady",
		},
		probes: {
			startup: {
				enabled: false,
				initialDelaySeconds: 30,
				periodSeconds: 30,
				timeoutSeconds: 10,
				failureThreshold: 3,
			},
			readiness: {
				enabled: false,
				initialDelaySeconds: 30,
				periodSeconds: 30,
				timeoutSeconds: 10,
				failureThreshold: 3,
			},
			liveness: {
				enabled: false,
				initialDelaySeconds: 30,
				periodSeconds: 30,
				timeoutSeconds: 10,
				failureThreshold: 3,
			},
		},
	},
	{
		iid: "mongodb",
		slug: "mongodb",
		name: "mongodb",
		type: "statefulset",
		template: {
			name: "MongoDB",
			manifest: "mongodbv1.0.yaml",
			version: "1.0",
		},
		pipelineStatus: "N/A",
		variables: [
			{
				name: "MONGO_INITDB_ROOT_USERNAME",
				value: process.env.CLUSTER_DB_USER,
			},
			{
				name: "MONGO_INITDB_ROOT_PASSWORD",
				value: process.env.CLUSTER_DB_PWD,
			},
			{
				name: "MONGO_INITDB_DATABASE",
				value: "admin",
			},
		],
		repoOrRegistry: "registry",
		registry: {
			imageUrl: "docker.io/mongo:7.0.7",
		},
		networking: {
			containerPort: 27017,
			tcpProxy: {
				enabled: false,
			},
			ingress: {
				enabled: false,
			},
			customDomain: {
				enabled: false,
			},
		},
		podConfig: {
			restartPolicy: "Always",
			cpuRequest: 100,
			cpuRequestType: "millicores",
			memoryRequest: 256,
			memoryRequestType: "mebibyte",
			cpuLimit: 1,
			cpuLimitType: "cores",
			memoryLimit: 1,
			memoryLimitType: "gibibyte",
		},
		storageConfig: {
			enabled: true,
			mountPath: "/data/db",
			size: 1,
			sizeType: "gibibyte",
			accessModes: ["ReadWriteOnce"],
		},
		statefulSetConfig: {
			desiredReplicas: 1,
			persistentVolumeClaimRetentionPolicy: {
				whenDeleted: "Retain",
				whenScaled: "Retain",
			},
			strategy: "RollingUpdate",
			rollingUpdate: {
				maxUnavailable: 1,
				maxUnavailableType: "number",
				partition: 0,
			},
			revisionHistoryLimit: 10,
			podManagementPolicy: "OrderedReady",
		},
		probes: {
			startup: {
				enabled: false,
				initialDelaySeconds: 30,
				periodSeconds: 30,
				timeoutSeconds: 10,
				failureThreshold: 3,
			},
			readiness: {
				enabled: false,
				initialDelaySeconds: 30,
				periodSeconds: 30,
				timeoutSeconds: 10,
				failureThreshold: 3,
			},
			liveness: {
				enabled: false,
				initialDelaySeconds: 30,
				periodSeconds: 30,
				timeoutSeconds: 10,
				failureThreshold: 3,
			},
		},
	},
	{
		iid: "registry",
		slug: "registry",
		name: "registry",
		type: "statefulset",
		pipelineStatus: "N/A",
		variables: [],
		repoOrRegistry: "registry",
		registry: {
			imageUrl: "registry:2.8.3",
		},
		networking: {
			containerPort: 5000,
			tcpProxy: {
				enabled: false,
			},
			ingress: {
				enabled: false,
			},
			customDomain: {
				enabled: false,
			},
		},
		podConfig: {
			restartPolicy: "Always",
			cpuRequest: 100,
			cpuRequestType: "millicores",
			memoryRequest: 256,
			memoryRequestType: "mebibyte",
			cpuLimit: 1,
			cpuLimitType: "cores",
			memoryLimit: 1,
			memoryLimitType: "gibibyte",
		},
		storageConfig: {
			enabled: true,
			mountPath: "/var/lib/registry",
			size: 50,
			sizeType: "gibibyte",
			accessModes: ["ReadWriteOnce"],
		},
		statefulSetConfig: {
			desiredReplicas: 1,
			persistentVolumeClaimRetentionPolicy: {
				whenDeleted: "Retain",
				whenScaled: "Retain",
			},
			strategy: "RollingUpdate",
			rollingUpdate: {
				maxUnavailable: 1,
				maxUnavailableType: "number",
				partition: 0,
			},
			revisionHistoryLimit: 10,
			podManagementPolicy: "OrderedReady",
		},
		probes: {
			startup: {
				enabled: false,
				initialDelaySeconds: 30,
				periodSeconds: 30,
				timeoutSeconds: 10,
				failureThreshold: 3,
			},
			readiness: {
				enabled: false,
				initialDelaySeconds: 30,
				periodSeconds: 30,
				timeoutSeconds: 10,
				failureThreshold: 3,
			},
			liveness: {
				enabled: false,
				initialDelaySeconds: 30,
				periodSeconds: 30,
				timeoutSeconds: 10,
				failureThreshold: 3,
			},
		},
	},
];
