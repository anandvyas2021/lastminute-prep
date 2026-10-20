import { ResourcePhase, CostGuardrail } from "@/types";

/**
 * Curated AWS Production Mastery Resources
 * Extracted and structured from the AWS Production Expert Roadmap.
 * 
 * Provides verified links, time commitments, costs, and value rationales
 * for learners who want to watch video courses, run hands-on workshops,
 * or inspect production GitHub repositories.
 */

export const awsPhases: ResourcePhase[] = [
  {
    phase: 1,
    name: "Computing & AWS Architectural Foundations",
    timeline: "Weeks 1–6",
    goal: "Master OSI networking, IP packet routing, Linux CLI, and core AWS multi-tier architecture before touching high-level abstractions.",
    milestone: "Deploy a multi-tier, multi-AZ VPC from scratch without the AWS VPC wizard, with public/private subnets, custom route tables, NAT Gateways, and a secure bastion host.",
    tracks: [
      {
        id: "aws-tr-01",
        title: "Adrian Cantrill — Solutions Architect Associate (SAA-C03)",
        url: "https://learn.cantrill.io/p/aws-certified-solutions-architect-associate-saa-c03",
        type: "Comprehensive Video Course",
        cost: "Paid (~$40)",
        time: "70 hours",
        domain: "Core Architecture & Networking",
        why: "Teaches underlying computer science fundamentals (OSI 7 layers, TCP handshake, DNS resolution, asymmetric encryption) before AWS services. Custom animations show packet flows and failure domains.",
        level: "Beginner"
      },
      {
        id: "aws-tr-02",
        title: "Learn to Cloud (Rishab Kumar & Gwyneth Peña)",
        url: "https://learntocloud.guide",
        type: "Open-Source Syllabus",
        cost: "100% Free",
        time: "40 hours",
        domain: "Linux, Git & Cloud Basics",
        why: "Covers essential Linux system administration, bash automation, Git collaboration, and networking prerequisites to avoid the tutorial hell trap.",
        level: "Beginner"
      },
      {
        id: "aws-tr-03",
        title: "Cantrill Real-World GitHub Learning Labs",
        url: "https://github.com/acantril/learn-cantrill-io-labs",
        type: "Hands-On Repositories",
        cost: "100% Free",
        time: "20 hours",
        domain: "Practical Architecture",
        why: "Practical architecture scenarios: manual WordPress scale-out, multi-tier custom VPC build, Route 53 health-check failover.",
        level: "Intermediate"
      }
    ]
  },
  {
    phase: 2,
    name: "Infrastructure as Code (IaC) & Automation",
    timeline: "Weeks 7–10",
    goal: "Eliminate the AWS Web Console. Every single resource must be version-controlled, modularized, and automated.",
    milestone: "Completely destroy Phase 1's infrastructure and recreate the entire stack using clean, reusable Terraform modules with S3 remote backend and DynamoDB state locking.",
    tracks: [
      {
        id: "aws-tr-04",
        title: "Terraform Best Practices (Anton Babenko)",
        url: "https://www.terraform-best-practices.com/",
        type: "Architecture Guide",
        cost: "100% Free",
        time: "15 hours",
        domain: "Terraform & Terragrunt",
        why: "Authored by the creator of the official terraform-aws-modules (billions of downloads). Teaches production directory layouts, remote S3 state locking with DynamoDB, and Terragrunt.",
        level: "Intermediate"
      },
      {
        id: "aws-tr-05",
        title: "Anton Putra — Hands-On Production DevOps Tracks",
        url: "https://youtube.com/@AntonPutra",
        type: "Video & Code Repository",
        cost: "100% Free",
        time: "30 hours",
        domain: "DevOps & Production IaC",
        why: "Walks through every line of Terraform for production VPCs, EKS clusters, ALBs, RDS databases, and GitHub Actions CI/CD pipelines. All code open-source on GitHub.",
        level: "Advanced"
      },
      {
        id: "aws-tr-06",
        title: "Official AWS CDK Workshop",
        url: "https://cdkworkshop.com/",
        type: "Hands-On Tutorial",
        cost: "100% Free",
        time: "15 hours",
        domain: "Cloud Development Kit (CDK)",
        why: "Teaches modern imperative cloud development using TypeScript or Python. Covers L1/L2/L3 constructs, CDK Aspects for security compliance, and self-mutating deployment pipelines.",
        level: "Intermediate"
      }
    ]
  },
  {
    phase: 3,
    name: "Production Networking & Hardened Security",
    timeline: "Weeks 11–14",
    goal: "Build scalable enterprise network fabrics with Transit Gateway and enforce strict multi-account IAM security guardrails.",
    milestone: "Implement a 3-VPC Transit Gateway architecture with a central inspection VPC and deploy an AWS Organization SCP blocking unapproved regions and enforcing KMS encryption.",
    tracks: [
      {
        id: "aws-tr-07",
        title: "Adrian Cantrill — Advanced Networking Specialty (ANS-C01)",
        url: "https://learn.cantrill.io/p/aws-certified-advanced-networking-specialty",
        type: "Specialist Video Course",
        cost: "Paid (~$40)",
        time: "60 hours",
        domain: "Advanced Cloud Networking",
        why: "The ultimate networking deep dive: BGP route selection, AWS Direct Connect (Private/Public/Transit VIFs), Transit Gateway route isolation, and Route 53 Resolver hybrid DNS.",
        level: "Advanced"
      },
      {
        id: "aws-tr-08",
        title: "AWS Networking Immersion Day Workshop",
        url: "https://networking.workshop.aws/",
        type: "Official AWS Lab",
        cost: "100% Free",
        time: "12 hours",
        domain: "VPC Inspection & Firewalls",
        why: "Hands-on implementation of centralized inspection VPCs with AWS Network Firewall, Gateway Load Balancers (GWLB), and VPC Flow Log packet analysis.",
        level: "Advanced"
      },
      {
        id: "aws-tr-09",
        title: "AWS IAM Permissions Guardrails Workshop",
        url: "https://aws-iam-permissions-guardrails.workshop.aws/",
        type: "Official Security Lab",
        cost: "100% Free",
        time: "10 hours",
        domain: "IAM Security & Guardrails",
        why: "Deep dive into IAM evaluation logic: Explicit Deny > SCPs > Permissions Boundaries > Identity Policies. Uses IAM Access Analyzer automated reasoning.",
        level: "Intermediate"
      }
    ]
  },
  {
    phase: 4,
    name: "Modern Scale: Containers & Serverless",
    timeline: "Weeks 15–18",
    goal: "Operate high-throughput container clusters using EKS with Karpenter and build resilient event-driven serverless systems.",
    milestone: "Deploy a multi-tenant EKS cluster via Terraform with Karpenter autoscaling, AWS Load Balancer Controller, and an event-driven serverless pipeline feeding into DynamoDB.",
    tracks: [
      {
        id: "aws-tr-10",
        title: "Official Amazon EKS Workshop (v2)",
        url: "https://www.eksworkshop.com/",
        type: "Official EKS Standard",
        cost: "100% Free",
        time: "35 hours",
        domain: "Kubernetes & EKS",
        why: "The gold standard for production Kubernetes on AWS: Karpenter just-in-time autoscaling, EKS Pod Identity, VPC CNI with prefix delegation, and ArgoCD GitOps.",
        level: "Advanced"
      },
      {
        id: "aws-tr-11",
        title: "Amazon ECS Workshop",
        url: "https://ecsworkshop.com/",
        type: "Official Workshop",
        cost: "100% Free",
        time: "15 hours",
        domain: "Containers & ECS",
        why: "For teams choosing serverless container simplicity without Kubernetes overhead: ECS Fargate, Service Connect, and FireLens log routing.",
        level: "Intermediate"
      },
      {
        id: "aws-tr-12",
        title: "Serverless Land (AWS Serverless Team)",
        url: "https://serverlessland.com/",
        type: "Patterns & Architecture Hub",
        cost: "100% Free",
        time: "20 hours",
        domain: "Serverless & Event-Driven",
        why: "Hundreds of production-ready patterns: EventBridge choreographies, Step Functions distributed workflows, SQS dead-letter queues, and Lambda power tuning.",
        level: "Intermediate"
      },
      {
        id: "aws-tr-13",
        title: "The DynamoDB Book (Alex DeBrie)",
        url: "https://www.dynamodbbook.com/",
        type: "Definitive Guide",
        cost: "Paid (~$79)",
        time: "20 hours",
        domain: "NoSQL & Single-Table Design",
        why: "The industry standard guide to DynamoDB single-table design, composite partition/sort keys, and sparse secondary indexes.",
        level: "Advanced"
      }
    ]
  },
  {
    phase: 5,
    name: "Production Observability, Resilience & FinOps",
    timeline: "Weeks 19–22",
    goal: "Ensure 99.99% uptime, distributed tracing, automated chaos engineering, and rigorous cloud cost optimization.",
    milestone: "Run a live chaos experiment simulating an AZ failure while monitoring via Managed Grafana, and deliver a Cost Optimization report detailing potential 30%+ savings.",
    tracks: [
      {
        id: "aws-tr-14",
        title: "AWS One Observability Workshop",
        url: "https://observability.workshop.aws/",
        type: "Official AWS Lab",
        cost: "100% Free",
        time: "20 hours",
        domain: "Observability & Tracing",
        why: "Full implementation of the 3 observability pillars: CloudWatch Container Insights, OpenTelemetry (ADOT), Amazon Managed Prometheus (AMP), and Managed Grafana (AMG).",
        level: "Advanced"
      },
      {
        id: "aws-tr-15",
        title: "AWS Fault Injection Simulator (FIS) Chaos Workshop",
        url: "https://catalog.workshops.aws/fis/en-US",
        type: "Official Chaos Lab",
        cost: "100% Free",
        time: "15 hours",
        domain: "Chaos Engineering",
        why: "Simulate live production outages: terminate EC2 instances, throttle network throughput, test multi-AZ DB failovers, and verify RTO/RPO recovery time.",
        level: "Advanced"
      },
      {
        id: "aws-tr-16",
        title: "AWS Well-Architected Cost Optimization Labs",
        url: "https://wellarchitectedlabs.com/cost/",
        type: "FinOps Best Practice",
        cost: "100% Free",
        time: "15 hours",
        domain: "FinOps & Cost Control",
        why: "Setup Cost & Usage Reports (CUR) with Amazon Athena and QuickSight. Master Compute Optimizer, Spot vs Savings Plans analysis, and Graviton migration.",
        level: "Intermediate"
      }
    ]
  },
  {
    phase: 6,
    name: "Enterprise Architecture & Capstone Mastery",
    timeline: "Weeks 23–26",
    goal: "Synthesize all domains into production portfolio capstones and strategic enterprise cloud architecture design.",
    milestone: "Pass an end-to-end Well-Architected review on a production multi-account environment deployed strictly via GitHub Actions GitOps and Terraform.",
    tracks: [
      {
        id: "aws-tr-17",
        title: "AWS Well-Architected Labs (Levels 300 & 400)",
        url: "https://wellarchitectedlabs.com/",
        type: "Advanced Enterprise Labs",
        cost: "100% Free",
        time: "40 hours",
        domain: "Enterprise Architecture",
        why: "Advanced hands-on implementations covering all 6 Well-Architected pillars: Operational Excellence, Security, Reliability, Performance, Cost, and Sustainability.",
        level: "Expert"
      },
      {
        id: "aws-tr-18",
        title: "The Cloud Resume Challenge (Forrest Brazeal)",
        url: "https://cloudresumechallenge.dev/",
        type: "Proof-of-Work Project",
        cost: "100% Free",
        time: "25 hours",
        domain: "Portfolio Proof",
        why: "Full-stack production portfolio proof: S3, CloudFront CDN, ACM SSL, Route 53, DynamoDB, Python/Node Lambda, GitHub Actions CI/CD, and Terraform IaC.",
        level: "Intermediate"
      },
      {
        id: "aws-tr-19",
        title: "Adrian Cantrill — Solutions Architect Professional (SAP-C02)",
        url: "https://learn.cantrill.io/p/aws-certified-solutions-architect-professional",
        type: "Elite Architecture Course",
        cost: "Paid (~$40)",
        time: "80 hours",
        domain: "Enterprise Migration & Strategy",
        why: "The pinnacle of AWS architecture: multi-account consolidated migrations, complex hybrid Active Directory integrations, and multi-region active-active disaster recovery.",
        level: "Expert"
      }
    ]
  }
];

export const awsCostGuardrails: CostGuardrail[] = [
  {
    title: "Strict Budget Alarms",
    description: "Create an AWS Budget in your Management Account for $5.00/month with alerts at 50%, 80%, and 100% sent directly to your phone via SNS/Email.",
    severity: "critical"
  },
  {
    title: "High-Cost Service Warnings",
    description: "Watch out for resources billed per hour regardless of traffic: NAT Gateways ($0.045/hr), Transit Gateways ($0.05/hr), and EKS Clusters ($0.10/hr). Always destroy them when done!",
    severity: "warning"
  },
  {
    title: "Automated Teardown Tools",
    description: "Use open-source tools like cloud-nuke or aws-nuke in lab accounts to wipe every stray resource in all regions before going to bed.",
    severity: "info"
  }
];
