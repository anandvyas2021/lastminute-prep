import { RevisionNote } from "@/types";

/**
 * AWS & Cloud Architecture Revision Notes
 * 
 * Note: These starter notes are fully typed and structured.
 * You can easily replace or extend them with your incoming TypeScript notes!
 */
export const awsNotes: RevisionNote[] = [
  {
    id: "aws-01",
    slug: "aws-iam-evaluation-logic-and-permission-boundaries",
    title: "AWS IAM Evaluation Logic: The 6-Step Decision Pipeline",
    category: "cloud-aws",
    readTimeMinutes: 6,
    difficulty: "High-Yield",
    summary: "How AWS evaluates permissions: Explicit Deny > SCPs > Resource Policies > Permissions Boundaries > Session Policies > Identity Policies.",
    tags: ["AWS", "IAM", "Security", "SCPs", "Permissions Boundaries"],
    lastUpdated: "Updated today",
    tlDr: "Default is always Implicit Deny. Any single Explicit Deny immediately kills the request. For an access to be allowed, it must pass through ALL intersecting boundaries: Organization SCPs AND Permissions Boundaries AND Identity-based / Resource-based policies.",
    coreConcepts: [
      {
        heading: "1. The 6-Step Evaluation Flow",
        explanation: "Memorize this sequence for senior cloud security interviews:",
        bulletPoints: [
          "Step 1: Check for Explicit Deny. If found anywhere, immediately DENY.",
          "Step 2: Service Control Policies (SCPs) check. If the parent AWS Org doesn't allow it, DENY.",
          "Step 3: Resource-based Policies. If present, can grant access directly across accounts (e.g. S3 Bucket Policy).",
          "Step 4: Permissions Boundaries. Acts as a ceiling/max possible permissions an IAM user or role can possess.",
          "Step 5: Session Policies (STS AssumeRole). Further restricts temporary credentials.",
          "Step 6: Identity-based Policies. If explicit allow is found and no boundary blocked it, ALLOW."
        ]
      }
    ],
    interviewTraps: [
      {
        mythOrTrap: "Thinking that an IAM user with AdministratorAccess can bypass an SCP.",
        realityOrSolution: "SCPs set guardrails on entire AWS accounts including the root user and local AdministratorAccess. An SCP deny cannot be overridden by any local IAM policy."
      }
    ],
    tradeOffs: [
      {
        optionA: "Resource Policy (e.g. S3 Bucket Policy)",
        optionB: "Cross-Account IAM Role (STS AssumeRole)",
        whenToUseA: "Direct, high-throughput access without credential rotation overhead; caller retains their original principal ARN.",
        whenToUseB: "Complex API operations across many AWS services, centralized audit logging via CloudTrail."
      }
    ],
    quickCheckQuestions: [
      {
        question: "Can an IAM role be used if a Permissions Boundary is attached that does NOT include the requested action?",
        answer: "No. The effective permissions are the intersection of the Identity Policy and the Permissions Boundary. If either omits the action, it is denied."
      }
    ]
  },
  {
    id: "aws-02",
    slug: "s3-vs-ebs-vs-efs-storage-matrix",
    title: "AWS Storage Matrix: S3 vs EBS vs EFS (Latency, Scale & Cost)",
    category: "cloud-aws",
    readTimeMinutes: 5,
    difficulty: "Fundamental",
    summary: "Block vs File vs Object storage. IOPS provisioned, multi-attach limits, and cross-AZ latency trade-offs.",
    tags: ["AWS", "S3", "EBS", "EFS", "Storage"],
    lastUpdated: "Updated today",
    tlDr: "EBS = Block storage (single EC2 instance, sub-millisecond latency, tied to 1 AZ). EFS = Managed NFS (POSIX file system, shared across thousands of EC2/ECS/EKS instances across AZs). S3 = Object store (infinite scale, HTTP REST API, 100ms first-byte latency, highest durability 11 9s).",
    coreConcepts: [
      {
        heading: "Decision Tree",
        explanation: "Match workload to storage engine:",
        bulletPoints: [
          "Low-latency transactional database (MySQL, Postgres, MongoDB) -> EBS io2 or gp3 volumes.",
          "Shared WordPress uploads, Kubernetes ReadWriteMany (RWX) persistent volumes -> EFS.",
          "Unstructured images, videos, data lake Parquet files, static website assets -> S3 Standard / S3 Glacier."
        ]
      }
    ],
    interviewTraps: [
      {
        mythOrTrap: "Mounting an EBS volume across EC2 instances in different Availability Zones.",
        realityOrSolution: "Standard EBS volumes are strictly confined to a single AZ. Even with EBS Multi-Attach (io2), all instances must reside in the exact same AZ. Use EFS for cross-AZ shared access."
      }
    ]
  }
];
