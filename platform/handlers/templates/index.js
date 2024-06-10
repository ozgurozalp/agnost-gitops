export const templates = [
	{
		category: "Database",
		templates: [
			{
				name: "MongoDB",
				description:
					"MongoDB is a general purpose, document-based database built for the cloud era.",
				manifest: "mongodbv1.0.yaml",
				version: "1.0",
				isLatest: true,
				type: "statefulset",
				config: {
					visibleSections: [
						"general",
						"networking",
						"podConfig",
						"storageConfig",
					],
					visibleFields: [
						"name",
						"networking.containerPort",
						"networking.tcpProxy.enabled",
						"podConfig.cpuRequest",
						"podConfig.cpuRequestType",
						"podConfig.cpuLimit",
						"podConfig.cpuLimitType",
						"podConfig.memoryRequest",
						"podConfig.memoryRequestType",
						"podConfig.memoryLimit",
						"podConfig.memoryLimitType",
						"storageConfig.enabled",
						"storageConfig.size",
						"storageConfig.sizeType",
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenDeleted",
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenScaled",
					],
					disabledFields: ["networking.containerPort", "storageConfig.enabled"],
					defaultValues: {
						"registry.imageUrl": "docker.io/mongo:7.0.7",
						"networking.containerPort": 27017,
						"networking.tcpProxy.enabled": false,
						"podConfig.restartPolicy": "Always",
						"podConfig.cpuRequest": 100,
						"podConfig.cpuRequestType": "millicores",
						"podConfig.cpuLimit": 1,
						"podConfig.cpuLimitType": "cores",
						"podConfig.memoryRequest": 512,
						"podConfig.memoryRequestType": "mebibyte",
						"podConfig.memoryLimit": 1,
						"podConfig.memoryLimitType": "gibibyte",
						"storageConfig.enabled": true,
						"storageConfig.mountPath": "/data/db",
						"storageConfig.size": 1,
						"storageConfig.sizeType": "gibibyte",
						"storageConfig.accessModes": ["ReadWriteOnce"],
						"statefulSetConfig.desiredReplicas": 1,
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenDeleted":
							"Retain",
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenScaled":
							"Retain",
						"probes.readiness.enabled": false,
						"probes.liveness.enabled": false,
						"probes.startup.enabled": false,
					},
					secrets: {
						username: "mongo-admin",
						password: "{{random:18}}",
						keyfile: "{{random:756}}",
					},
					variables: {
						MONGO_INITDB_ROOT_USERNAME: "{{secret:username}}",
						MONGO_INITDB_ROOT_PASSWORD: "{{secret:password}}",
						MONGO_INITDB_DATABASE: "admin",
					},
				},
			},
			{
				name: "PostgreSQL",
				description:
					"PostgreSQL is a powerful, open source object-relational database system.",
				manifest: "postgresqlv1.0.yaml",
				version: "1.0",
				isLatest: true,
				type: "statefulset",
				config: {
					visibleSections: [
						"general",
						"networking",
						"podConfig",
						"storageConfig",
					],
					visibleFields: [
						"name",
						"networking.containerPort",
						"networking.tcpProxy.enabled",
						"podConfig.cpuRequest",
						"podConfig.cpuRequestType",
						"podConfig.cpuLimit",
						"podConfig.cpuLimitType",
						"podConfig.memoryRequest",
						"podConfig.memoryRequestType",
						"podConfig.memoryLimit",
						"podConfig.memoryLimitType",
						"storageConfig.enabled",
						"storageConfig.size",
						"storageConfig.sizeType",
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenDeleted",
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenScaled",
					],
					disabledFields: ["networking.containerPort", "storageConfig.enabled"],
					defaultValues: {
						"registry.imageUrl": "docker.io/postgres:16",
						"networking.containerPort": 5432,
						"networking.tcpProxy.enabled": false,
						"podConfig.restartPolicy": "Always",
						"podConfig.cpuRequest": 100,
						"podConfig.cpuRequestType": "millicores",
						"podConfig.cpuLimit": 1,
						"podConfig.cpuLimitType": "cores",
						"podConfig.memoryRequest": 512,
						"podConfig.memoryRequestType": "mebibyte",
						"podConfig.memoryLimit": 1,
						"podConfig.memoryLimitType": "gibibyte",
						"storageConfig.enabled": true,
						"storageConfig.mountPath": "/var/lib/postgresql/data",
						"storageConfig.size": 1,
						"storageConfig.sizeType": "gibibyte",
						"storageConfig.accessModes": ["ReadWriteOnce"],
						"statefulSetConfig.desiredReplicas": 1,
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenDeleted":
							"Retain",
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenScaled":
							"Retain",
						"probes.readiness.enabled": false,
						"probes.liveness.enabled": false,
						"probes.startup.enabled": false,
					},
					secrets: {
						username: "postgres",
						password: "{{random:18}}",
					},
					variables: {
						POSTGRES_USER: "{{secret:username}}",
						POSTGRES_PASSWORD: "{{secret:password}}",
					},
				},
			},
			{
				name: "MySQL",
				description:
					"MySQL is an open-source relational database management system.",
				manifest: "mysqlv1.0.yaml",
				version: "1.0",
				isLatest: true,
				type: "statefulset",
				config: {
					visibleSections: [
						"general",
						"networking",
						"podConfig",
						"storageConfig",
					],
					visibleFields: [
						"name",
						"networking.containerPort",
						"networking.tcpProxy.enabled",
						"podConfig.cpuRequest",
						"podConfig.cpuRequestType",
						"podConfig.cpuLimit",
						"podConfig.cpuLimitType",
						"podConfig.memoryRequest",
						"podConfig.memoryRequestType",
						"podConfig.memoryLimit",
						"podConfig.memoryLimitType",
						"storageConfig.enabled",
						"storageConfig.size",
						"storageConfig.sizeType",
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenDeleted",
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenScaled",
					],
					disabledFields: ["networking.containerPort", "storageConfig.enabled"],
					defaultValues: {
						"registry.imageUrl": "docker.io/mysql:8.4",
						"networking.containerPort": 3306,
						"networking.tcpProxy.enabled": false,
						"podConfig.restartPolicy": "Always",
						"podConfig.cpuRequest": 100,
						"podConfig.cpuRequestType": "millicores",
						"podConfig.cpuLimit": 1,
						"podConfig.cpuLimitType": "cores",
						"podConfig.memoryRequest": 512,
						"podConfig.memoryRequestType": "mebibyte",
						"podConfig.memoryLimit": 1,
						"podConfig.memoryLimitType": "gibibyte",
						"storageConfig.enabled": true,
						"storageConfig.mountPath": "/var/lib/mysql",
						"storageConfig.size": 1,
						"storageConfig.sizeType": "gibibyte",
						"storageConfig.accessModes": ["ReadWriteOnce"],
						"statefulSetConfig.desiredReplicas": 1,
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenDeleted":
							"Retain",
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenScaled":
							"Retain",
						"probes.readiness.enabled": false,
						"probes.liveness.enabled": false,
						"probes.startup.enabled": false,
					},
					secrets: {
						username: "root",
						password: "{{random:18}}",
					},
					variables: {
						MYSQL_ROOT_USER: "{{secret:username}}",
						MYSQL_ROOT_PASSWORD: "{{secret:password}}",
					},
				},
			},
			{
				name: "MariaDB",
				description:
					"MariaDB is a community-developed, commercially supported fork of the MySQL relational database management system.",
				manifest: "mariadbv1.0.yaml",
				version: "1.0",
				isLatest: true,
				type: "statefulset",
				config: {
					visibleSections: [
						"general",
						"networking",
						"podConfig",
						"storageConfig",
					],
					visibleFields: [
						"name",
						"networking.containerPort",
						"networking.tcpProxy.enabled",
						"podConfig.cpuRequest",
						"podConfig.cpuRequestType",
						"podConfig.cpuLimit",
						"podConfig.cpuLimitType",
						"podConfig.memoryRequest",
						"podConfig.memoryRequestType",
						"podConfig.memoryLimit",
						"podConfig.memoryLimitType",
						"storageConfig.enabled",
						"storageConfig.size",
						"storageConfig.sizeType",
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenDeleted",
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenScaled",
					],
					disabledFields: ["networking.containerPort", "storageConfig.enabled"],
					defaultValues: {
						"registry.imageUrl": "docker.io/mariadb:11.2",
						"networking.containerPort": 3306,
						"networking.tcpProxy.enabled": false,
						"podConfig.restartPolicy": "Always",
						"podConfig.cpuRequest": 100,
						"podConfig.cpuRequestType": "millicores",
						"podConfig.cpuLimit": 1,
						"podConfig.cpuLimitType": "cores",
						"podConfig.memoryRequest": 512,
						"podConfig.memoryRequestType": "mebibyte",
						"podConfig.memoryLimit": 1,
						"podConfig.memoryLimitType": "gibibyte",
						"storageConfig.enabled": true,
						"storageConfig.mountPath": "/var/lib/mysql",
						"storageConfig.size": 1,
						"storageConfig.sizeType": "gibibyte",
						"storageConfig.accessModes": ["ReadWriteOnce"],
						"statefulSetConfig.desiredReplicas": 1,
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenDeleted":
							"Retain",
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenScaled":
							"Retain",
						"probes.readiness.enabled": false,
						"probes.liveness.enabled": false,
						"probes.startup.enabled": false,
					},
					secrets: {
						username: "root",
						password: "{{random:18}}",
					},
					variables: {
						MARIADB_ROOT_USER: "{{secret:username}}",
						MARIADB_ROOT_PASSWORD: "{{secret:password}}",
					},
				},
			},
		],
	},
	{
		category: "KV Store",
		templates: [
			{
				name: "Redis",
				description:
					"Redis is an open source in-memory data structure store, used as a database, cache and message broker.",
				manifest: "redisv1.0.yaml",
				version: "1.0",
				isLatest: true,
				type: "statefulset",
				config: {
					visibleSections: [
						"general",
						"networking",
						"podConfig",
						"storageConfig",
					],
					visibleFields: [
						"name",
						"networking.containerPort",
						"networking.tcpProxy.enabled",
						"podConfig.cpuRequest",
						"podConfig.cpuRequestType",
						"podConfig.cpuLimit",
						"podConfig.cpuLimitType",
						"podConfig.memoryRequest",
						"podConfig.memoryRequestType",
						"podConfig.memoryLimit",
						"podConfig.memoryLimitType",
						"storageConfig.enabled",
						"storageConfig.size",
						"storageConfig.sizeType",
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenDeleted",
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenScaled",
					],
					disabledFields: ["networking.containerPort", "storageConfig.enabled"],
					defaultValues: {
						"registry.imageUrl": "docker.io/redis:7.2.5",
						"networking.containerPort": 6379,
						"networking.tcpProxy.enabled": false,
						"podConfig.restartPolicy": "Always",
						"podConfig.cpuRequest": 100,
						"podConfig.cpuRequestType": "millicores",
						"podConfig.cpuLimit": 1,
						"podConfig.cpuLimitType": "cores",
						"podConfig.memoryRequest": 256,
						"podConfig.memoryRequestType": "mebibyte",
						"podConfig.memoryLimit": 1,
						"podConfig.memoryLimitType": "gibibyte",
						"storageConfig.enabled": true,
						"storageConfig.mountPath": "/data",
						"storageConfig.size": 512,
						"storageConfig.sizeType": "mebibyte",
						"storageConfig.accessModes": ["ReadWriteOnce"],
						"statefulSetConfig.desiredReplicas": 1,
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenDeleted":
							"Retain",
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenScaled":
							"Retain",
						"probes.readiness.enabled": false,
						"probes.liveness.enabled": false,
						"probes.startup.enabled": false,
					},
					secrets: {
						password: "{{random:18}}",
					},
					variables: {
						REDIS_PASSWORD: "{{secret:password}}",
					},
				},
			},
			{
				name: "Memcached",
				description:
					"Memcached is a general-purpose distributed memory-caching system.",
				manifest: "memcachedv1.0.yaml",
				version: "1.0",
				isLatest: true,
				type: "deployment",
				config: {
					visibleSections: ["general", "networking", "podConfig"],
					visibleFields: [
						"name",
						"networking.containerPort",
						"networking.tcpProxy.enabled",
						"podConfig.cpuRequest",
						"podConfig.cpuRequestType",
						"podConfig.cpuLimit",
						"podConfig.cpuLimitType",
						"podConfig.memoryRequest",
						"podConfig.memoryRequestType",
						"podConfig.memoryLimit",
						"podConfig.memoryLimitType",
					],
					disabledFields: ["networking.containerPort"],
					defaultValues: {
						"registry.imageUrl": "docker.io/memcached:1.6.28",
						"networking.containerPort": 11211,
						"networking.tcpProxy.enabled": false,
						"podConfig.restartPolicy": "Always",
						"podConfig.cpuRequest": 100,
						"podConfig.cpuRequestType": "millicores",
						"podConfig.cpuLimit": 1,
						"podConfig.cpuLimitType": "cores",
						"podConfig.memoryRequest": 256,
						"podConfig.memoryRequestType": "mebibyte",
						"podConfig.memoryLimit": 1,
						"podConfig.memoryLimitType": "gibibyte",
						"storageConfig.enabled": false,
						"probes.readiness.enabled": false,
						"probes.liveness.enabled": false,
						"probes.startup.enabled": false,
						"deploymentConfig.desiredReplicas": 1,
						"deploymentConfig.cpuMetric.enabled": false,
						"deploymentConfig.memoryMetric.enabled": false,
					},
					secrets: {},
					variables: {},
				},
			},
		],
	},
	{
		category: "Object Storage",
		templates: [
			{
				name: "MinIO",
				description:
					"MinIO is a high performance, Amazon S3 compatible distributed object storage server, designed for large-scale cloud infrastructure.",
				manifest: "miniov1.0.yaml",
				version: "1.0",
				isLatest: true,
				type: "statefulset",
				config: {
					visibleSections: [
						"general",
						"networking",
						"podConfig",
						"storageConfig",
					],
					visibleFields: [
						"name",
						"networking.containerPort",
						"networking.tcpProxy.enabled",
						"podConfig.cpuRequest",
						"podConfig.cpuRequestType",
						"podConfig.cpuLimit",
						"podConfig.cpuLimitType",
						"podConfig.memoryRequest",
						"podConfig.memoryRequestType",
						"podConfig.memoryLimit",
						"podConfig.memoryLimitType",
						"storageConfig.enabled",
						"storageConfig.size",
						"storageConfig.sizeType",
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenDeleted",
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenScaled",
					],
					disabledFields: ["networking.containerPort", "storageConfig.enabled"],
					defaultValues: {
						"registry.imageUrl":
							"quay.io/minio/minio:RELEASE.2024-05-10T01-41-38Z",
						"networking.containerPort": 9000,
						"networking.tcpProxy.enabled": false,
						"podConfig.restartPolicy": "Always",
						"podConfig.cpuRequest": 100,
						"podConfig.cpuRequestType": "millicores",
						"podConfig.cpuLimit": 1,
						"podConfig.cpuLimitType": "cores",
						"podConfig.memoryRequest": 256,
						"podConfig.memoryRequestType": "mebibyte",
						"podConfig.memoryLimit": 1,
						"podConfig.memoryLimitType": "gibibyte",
						"storageConfig.enabled": true,
						"storageConfig.mountPath": "/data",
						"storageConfig.size": 1,
						"storageConfig.sizeType": "gibibyte",
						"storageConfig.accessModes": ["ReadWriteOnce"],
						"statefulSetConfig.desiredReplicas": 1,
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenDeleted":
							"Retain",
						"statefulSetConfig.persistentVolumeClaimRetentionPolicy.whenScaled":
							"Retain",
						"probes.readiness.enabled": false,
						"probes.liveness.enabled": false,
						"probes.startup.enabled": false,
					},
					secrets: {
						accessKey: "{{random:18}}",
						secretKey: "{{random:18}}",
					},
					variables: {
						MINIO_ROOT_USER: "{{secret:accessKey}}",
						MINIO_ROOT_PASSWORD: "{{secret:secretKey}}",
					},
				},
			},
		],
	},
];
