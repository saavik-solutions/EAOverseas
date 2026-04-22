
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/library.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}




  const path = require('path')

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  passwordHash: 'passwordHash',
  fullName: 'fullName',
  phone: 'phone',
  avatarUrl: 'avatarUrl',
  role: 'role',
  emailVerified: 'emailVerified',
  googleId: 'googleId',
  studentId: 'studentId',
  authProvider: 'authProvider',
  isActive: 'isActive',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  lastLoginAt: 'lastLoginAt'
};

exports.Prisma.ApiKeyScalarFieldEnum = {
  id: 'id',
  name: 'name',
  keyHash: 'keyHash',
  role: 'role',
  isActive: 'isActive',
  lastUsedAt: 'lastUsedAt',
  expiresAt: 'expiresAt',
  ownerId: 'ownerId',
  createdAt: 'createdAt'
};

exports.Prisma.RefreshTokenScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  tokenHash: 'tokenHash',
  familyId: 'familyId',
  deviceInfo: 'deviceInfo',
  ipAddress: 'ipAddress',
  expiresAt: 'expiresAt',
  revokedAt: 'revokedAt',
  createdAt: 'createdAt'
};

exports.Prisma.EmailOTPScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  purpose: 'purpose',
  otpHash: 'otpHash',
  attempts: 'attempts',
  expiresAt: 'expiresAt',
  usedAt: 'usedAt',
  createdAt: 'createdAt'
};

exports.Prisma.PhoneOTPScalarFieldEnum = {
  id: 'id',
  phone: 'phone',
  purpose: 'purpose',
  otpHash: 'otpHash',
  attempts: 'attempts',
  expiresAt: 'expiresAt',
  usedAt: 'usedAt',
  createdAt: 'createdAt'
};

exports.Prisma.UserProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  currentLevel: 'currentLevel',
  stream: 'stream',
  tenthPercentage: 'tenthPercentage',
  twelfthPercentage: 'twelfthPercentage',
  ugCgpa: 'ugCgpa',
  ugInstitution: 'ugInstitution',
  ugGraduationYear: 'ugGraduationYear',
  fieldOfStudy: 'fieldOfStudy',
  targetDegree: 'targetDegree',
  targetCountries: 'targetCountries',
  targetFields: 'targetFields',
  budgetMinUsd: 'budgetMinUsd',
  budgetMaxUsd: 'budgetMaxUsd',
  city: 'city',
  state: 'state',
  nationality: 'nationality',
  financialAidNeeded: 'financialAidNeeded',
  workExperienceMonths: 'workExperienceMonths',
  gapYearMonths: 'gapYearMonths',
  extracurriculars: 'extracurriculars',
  customSections: 'customSections',
  profileStrength: 'profileStrength',
  isPublic: 'isPublic',
  publicSlug: 'publicSlug',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TestScoreScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  examName: 'examName',
  score: 'score',
  maxScore: 'maxScore',
  percentile: 'percentile',
  subScores: 'subScores',
  examDate: 'examDate',
  validUntil: 'validUntil',
  isLatest: 'isLatest',
  isVerified: 'isVerified',
  documentUrl: 'documentUrl',
  createdAt: 'createdAt'
};

exports.Prisma.EducationHistoryScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  institutionName: 'institutionName',
  degree: 'degree',
  field: 'field',
  gpa: 'gpa',
  gpaScale: 'gpaScale',
  percentage: 'percentage',
  country: 'country',
  startDate: 'startDate',
  endDate: 'endDate',
  isCurrent: 'isCurrent',
  createdAt: 'createdAt'
};

exports.Prisma.UserDocumentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  docType: 'docType',
  fileName: 'fileName',
  fileUrl: 'fileUrl',
  fileSizeBytes: 'fileSizeBytes',
  mimeType: 'mimeType',
  verificationStatus: 'verificationStatus',
  verifiedById: 'verifiedById',
  verifiedAt: 'verifiedAt',
  notes: 'notes',
  createdAt: 'createdAt'
};

exports.Prisma.FeedPostScalarFieldEnum = {
  id: 'id',
  authorId: 'authorId',
  title: 'title',
  slug: 'slug',
  content: 'content',
  excerpt: 'excerpt',
  coverImageUrl: 'coverImageUrl',
  category: 'category',
  tags: 'tags',
  status: 'status',
  universityId: 'universityId',
  isPinned: 'isPinned',
  viewCount: 'viewCount',
  likeCount: 'likeCount',
  dislikeCount: 'dislikeCount',
  bookmarkCount: 'bookmarkCount',
  metadata: 'metadata',
  publishedAt: 'publishedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FeedInteractionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  postId: 'postId',
  type: 'type',
  createdAt: 'createdAt'
};

exports.Prisma.UniversityScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  country: 'country',
  city: 'city',
  type: 'type',
  qsRanking: 'qsRanking',
  theRanking: 'theRanking',
  websiteUrl: 'websiteUrl',
  logoUrl: 'logoUrl',
  bannerUrl: 'bannerUrl',
  description: 'description',
  acceptanceRate: 'acceptanceRate',
  totalStudents: 'totalStudents',
  intlStudentsPct: 'intlStudentsPct',
  establishedYear: 'establishedYear',
  campusSizeAcres: 'campusSizeAcres',
  notableAlumni: 'notableAlumni',
  tags: 'tags',
  isActive: 'isActive',
  dataVerifiedAt: 'dataVerifiedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UniversityCourseScalarFieldEnum = {
  id: 'id',
  universityId: 'universityId',
  name: 'name',
  slug: 'slug',
  degreeType: 'degreeType',
  field: 'field',
  subField: 'subField',
  durationYears: 'durationYears',
  language: 'language',
  intakeMonths: 'intakeMonths',
  applicationDeadline: 'applicationDeadline',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CourseRequirementScalarFieldEnum = {
  id: 'id',
  courseId: 'courseId',
  minGpa: 'minGpa',
  avgGpa: 'avgGpa',
  minPercentage: 'minPercentage',
  avgPercentage: 'avgPercentage',
  minIelts: 'minIelts',
  avgIelts: 'avgIelts',
  minToefl: 'minToefl',
  minPte: 'minPte',
  minDuolingo: 'minDuolingo',
  minSat: 'minSat',
  minGreVerbal: 'minGreVerbal',
  minGreQuant: 'minGreQuant',
  avgGreQuant: 'avgGreQuant',
  minGmat: 'minGmat',
  avgGmat: 'avgGmat',
  workExpYears: 'workExpYears',
  workExpRequired: 'workExpRequired',
  sopRequired: 'sopRequired',
  lorCount: 'lorCount',
  cvRequired: 'cvRequired',
  portfolioRequired: 'portfolioRequired',
  specificCoursesRequired: 'specificCoursesRequired',
  otherNotes: 'otherNotes',
  updatedAt: 'updatedAt'
};

exports.Prisma.CourseFeeScalarFieldEnum = {
  id: 'id',
  courseId: 'courseId',
  tuitionPerYearUsd: 'tuitionPerYearUsd',
  avgLivingPerYearUsd: 'avgLivingPerYearUsd',
  applicationFeeUsd: 'applicationFeeUsd',
  totalCostEstimateUsd: 'totalCostEstimateUsd',
  currencyLocal: 'currencyLocal',
  tuitionLocal: 'tuitionLocal',
  scholarshipAvailable: 'scholarshipAvailable',
  scholarshipAmountUsd: 'scholarshipAmountUsd',
  scholarshipDetails: 'scholarshipDetails',
  feeWaiverAvailable: 'feeWaiverAvailable',
  feeNotes: 'feeNotes',
  updatedAt: 'updatedAt'
};

exports.Prisma.SavedCollegeScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  courseId: 'courseId',
  priority: 'priority',
  notes: 'notes',
  savedAt: 'savedAt'
};

exports.Prisma.AIComparisonScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  courseId: 'courseId',
  matchScore: 'matchScore',
  category: 'category',
  scoreBreakdown: 'scoreBreakdown',
  strengths: 'strengths',
  weaknesses: 'weaknesses',
  suggestions: 'suggestions',
  alternatives: 'alternatives',
  aiExplanation: 'aiExplanation',
  modelVersion: 'modelVersion',
  processingMs: 'processingMs',
  cached: 'cached',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ActionPlanScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  comparisonId: 'comparisonId',
  courseId: 'courseId',
  milestones: 'milestones',
  targetIntake: 'targetIntake',
  targetDate: 'targetDate',
  status: 'status',
  completionPct: 'completionPct',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ApplicationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  universityId: 'universityId',
  courseId: 'courseId',
  comparisonId: 'comparisonId',
  status: 'status',
  priority: 'priority',
  applicationFee: 'applicationFee',
  feeStatus: 'feeStatus',
  feePaidAt: 'feePaidAt',
  personalStatement: 'personalStatement',
  counsellorId: 'counsellorId',
  internalNotes: 'internalNotes',
  appliedAt: 'appliedAt',
  decisionAt: 'decisionAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CommunityPostScalarFieldEnum = {
  id: 'id',
  authorId: 'authorId',
  title: 'title',
  content: 'content',
  imageUrl: 'imageUrl',
  category: 'category',
  tags: 'tags',
  isQuestion: 'isQuestion',
  isAnonymous: 'isAnonymous',
  voteScore: 'voteScore',
  commentCount: 'commentCount',
  isPinned: 'isPinned',
  isDeleted: 'isDeleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CommunityCommentScalarFieldEnum = {
  id: 'id',
  postId: 'postId',
  authorId: 'authorId',
  parentId: 'parentId',
  text: 'text',
  isAnswer: 'isAnswer',
  isBest: 'isBest',
  voteScore: 'voteScore',
  isDeleted: 'isDeleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CommunityVoteScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  postId: 'postId',
  commentId: 'commentId',
  value: 'value',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Role = exports.$Enums.Role = {
  student: 'student',
  vendor: 'vendor',
  counsellor: 'counsellor',
  admin: 'admin',
  super_admin: 'super_admin'
};

exports.CurrentLevel = exports.$Enums.CurrentLevel = {
  class_10: 'class_10',
  class_11: 'class_11',
  class_12: 'class_12',
  ug_year_1: 'ug_year_1',
  ug_year_2: 'ug_year_2',
  ug_year_3: 'ug_year_3',
  ug_final: 'ug_final',
  pg: 'pg',
  phd: 'phd',
  working_professional: 'working_professional'
};

exports.Stream = exports.$Enums.Stream = {
  science: 'science',
  commerce: 'commerce',
  arts: 'arts',
  engineering: 'engineering',
  medicine: 'medicine',
  law: 'law',
  other: 'other'
};

exports.TargetDegree = exports.$Enums.TargetDegree = {
  bachelors: 'bachelors',
  masters: 'masters',
  phd: 'phd',
  mba: 'mba',
  diploma: 'diploma'
};

exports.DocType = exports.$Enums.DocType = {
  transcript: 'transcript',
  sop: 'sop',
  lor: 'lor',
  passport: 'passport',
  cv_resume: 'cv_resume',
  english_test: 'english_test',
  financial_proof: 'financial_proof',
  other: 'other'
};

exports.VerificationStatus = exports.$Enums.VerificationStatus = {
  pending: 'pending',
  verified: 'verified',
  rejected: 'rejected'
};

exports.FeedCategory = exports.$Enums.FeedCategory = {
  admissions: 'admissions',
  scholarships: 'scholarships',
  exams: 'exams',
  news: 'news',
  visa: 'visa',
  events: 'events'
};

exports.PostStatus = exports.$Enums.PostStatus = {
  draft: 'draft',
  published: 'published',
  archived: 'archived'
};

exports.InteractionType = exports.$Enums.InteractionType = {
  like: 'like',
  dislike: 'dislike',
  bookmark: 'bookmark',
  view: 'view'
};

exports.UniversityType = exports.$Enums.UniversityType = {
  public: 'public',
  private: 'private',
  autonomous: 'autonomous'
};

exports.DegreeType = exports.$Enums.DegreeType = {
  bachelors: 'bachelors',
  masters: 'masters',
  phd: 'phd',
  diploma: 'diploma',
  certificate: 'certificate',
  associate: 'associate'
};

exports.CollegePriority = exports.$Enums.CollegePriority = {
  reach: 'reach',
  match: 'match',
  safety: 'safety'
};

exports.AICategory = exports.$Enums.AICategory = {
  high: 'high',
  moderate: 'moderate',
  low: 'low',
  very_low: 'very_low'
};

exports.PlanStatus = exports.$Enums.PlanStatus = {
  active: 'active',
  completed: 'completed',
  abandoned: 'abandoned'
};

exports.ApplicationStatus = exports.$Enums.ApplicationStatus = {
  draft: 'draft',
  submitted: 'submitted',
  pending: 'pending',
  under_review: 'under_review',
  accepted: 'accepted',
  rejected: 'rejected',
  waitlisted: 'waitlisted',
  withdrawn: 'withdrawn'
};

exports.ApplicationPriority = exports.$Enums.ApplicationPriority = {
  urgent: 'urgent',
  high: 'high',
  medium: 'medium',
  low: 'low'
};

exports.FeeStatus = exports.$Enums.FeeStatus = {
  unpaid: 'unpaid',
  paid: 'paid',
  waived: 'waived'
};

exports.CommunityCategory = exports.$Enums.CommunityCategory = {
  admissions: 'admissions',
  scholarships: 'scholarships',
  visas: 'visas',
  accommodation: 'accommodation',
  career_advice: 'career_advice',
  routine: 'routine',
  general: 'general'
};

exports.VoteValue = exports.$Enums.VoteValue = {
  up: 'up',
  down: 'down'
};

exports.Prisma.ModelName = {
  User: 'User',
  ApiKey: 'ApiKey',
  RefreshToken: 'RefreshToken',
  EmailOTP: 'EmailOTP',
  PhoneOTP: 'PhoneOTP',
  UserProfile: 'UserProfile',
  TestScore: 'TestScore',
  EducationHistory: 'EducationHistory',
  UserDocument: 'UserDocument',
  FeedPost: 'FeedPost',
  FeedInteraction: 'FeedInteraction',
  University: 'University',
  UniversityCourse: 'UniversityCourse',
  CourseRequirement: 'CourseRequirement',
  CourseFee: 'CourseFee',
  SavedCollege: 'SavedCollege',
  AIComparison: 'AIComparison',
  ActionPlan: 'ActionPlan',
  Application: 'Application',
  CommunityPost: 'CommunityPost',
  CommunityComment: 'CommunityComment',
  CommunityVote: 'CommunityVote'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\saavi\\OneDrive\\Desktop\\EAOverseas Backend\\backend\\prisma\\client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "C:\\Users\\saavi\\OneDrive\\Desktop\\EAOverseas Backend\\backend\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../.env"
  },
  "relativePath": "..",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"./client\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\n// --- ENUMS ---\n\nenum Role {\n  student\n  vendor\n  counsellor\n  admin\n  super_admin\n}\n\nenum VerificationStatus {\n  pending\n  verified\n  rejected\n}\n\nenum FeedCategory {\n  admissions\n  scholarships\n  exams\n  news\n  visa\n  events\n}\n\nenum PostStatus {\n  draft\n  published\n  archived\n}\n\nenum InteractionType {\n  like\n  dislike\n  bookmark\n  view\n}\n\nenum DegreeType {\n  bachelors\n  masters\n  phd\n  diploma\n  certificate\n  associate\n}\n\nenum UniversityType {\n  public\n  private\n  autonomous\n}\n\nenum AICategory {\n  high\n  moderate\n  low\n  very_low\n}\n\nenum CollegePriority {\n  reach\n  match\n  safety\n}\n\nenum ApplicationStatus {\n  draft\n  submitted\n  pending\n  under_review\n  accepted\n  rejected\n  waitlisted\n  withdrawn\n}\n\nenum ApplicationPriority {\n  urgent\n  high\n  medium\n  low\n}\n\nenum FeeStatus {\n  unpaid\n  paid\n  waived\n}\n\nenum DocType {\n  transcript\n  sop\n  lor\n  passport\n  cv_resume\n  english_test\n  financial_proof\n  other\n}\n\nenum PlanStatus {\n  active\n  completed\n  abandoned\n}\n\nenum CurrentLevel {\n  class_10\n  class_11\n  class_12\n  ug_year_1\n  ug_year_2\n  ug_year_3\n  ug_final\n  pg\n  phd\n  working_professional\n}\n\nenum Stream {\n  science\n  commerce\n  arts\n  engineering\n  medicine\n  law\n  other\n}\n\nenum TargetDegree {\n  bachelors\n  masters\n  phd\n  mba\n  diploma\n}\n\n// --- MODELS ---\n\nmodel User {\n  id            String    @id @default(uuid()) @db.Uuid\n  email         String    @unique\n  passwordHash  String?   @map(\"password_hash\")\n  fullName      String    @map(\"full_name\")\n  phone         String?\n  avatarUrl     String?   @map(\"avatar_url\")\n  role          Role      @default(student)\n  emailVerified Boolean   @default(false) @map(\"email_verified\")\n  googleId      String?   @unique @map(\"google_id\")\n  studentId     String?   @unique @map(\"student_id\")\n  authProvider  String    @default(\"email\") @map(\"auth_provider\")\n  isActive      Boolean   @default(true) @map(\"is_active\")\n  deletedAt     DateTime? @map(\"deleted_at\")\n  createdAt     DateTime  @default(now()) @map(\"created_at\")\n  updatedAt     DateTime  @updatedAt @map(\"updated_at\")\n  lastLoginAt   DateTime? @map(\"last_login_at\")\n\n  refreshTokens     RefreshToken[]\n  emailOtps         EmailOTP[]\n  profile           UserProfile?\n  testScores        TestScore[]\n  educationHistory  EducationHistory[]\n  documents         UserDocument[]\n  feedPosts         FeedPost[]\n  feedInteractions  FeedInteraction[]\n  savedColleges     SavedCollege[]\n  aiComparisons     AIComparison[]\n  actionPlans       ActionPlan[]\n  applications      Application[]\n  apiKeys           ApiKey[]\n  communityPosts    CommunityPost[]    @relation(\"CommunityAuthor\")\n  communityComments CommunityComment[] @relation(\"CommunityCommenter\")\n  communityVotes    CommunityVote[]    @relation(\"CommunityVoter\")\n\n  @@map(\"users\")\n}\n\nmodel ApiKey {\n  id         String    @id @default(uuid()) @db.Uuid\n  name       String // e.g., \"Admin Dashboard Production\"\n  keyHash    String    @unique @map(\"key_hash\")\n  role       Role      @default(admin)\n  isActive   Boolean   @default(true) @map(\"is_active\")\n  lastUsedAt DateTime? @map(\"last_used_at\")\n  expiresAt  DateTime? @map(\"expires_at\")\n  ownerId    String?   @map(\"owner_id\") @db.Uuid\n  createdAt  DateTime  @default(now()) @map(\"created_at\")\n\n  owner User? @relation(fields: [ownerId], references: [id])\n\n  @@map(\"api_keys\")\n}\n\nmodel RefreshToken {\n  id         String    @id @default(uuid()) @db.Uuid\n  userId     String    @map(\"user_id\") @db.Uuid\n  tokenHash  String    @unique @map(\"token_hash\")\n  familyId   String    @default(uuid()) @map(\"family_id\") @db.Uuid\n  deviceInfo String?   @map(\"device_info\")\n  ipAddress  String?   @map(\"ip_address\") // Better to use String in Prisma for INET\n  expiresAt  DateTime  @map(\"expires_at\")\n  revokedAt  DateTime? @map(\"revoked_at\")\n  createdAt  DateTime  @default(now()) @map(\"created_at\")\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@map(\"refresh_tokens\")\n}\n\nmodel EmailOTP {\n  id        String    @id @default(uuid()) @db.Uuid\n  userId    String    @map(\"user_id\") @db.Uuid\n  purpose   String\n  otpHash   String    @map(\"otp_hash\")\n  attempts  Int       @default(0) @db.SmallInt\n  expiresAt DateTime  @default(dbgenerated(\"(now() + '00:15:00'::interval)\")) @map(\"expires_at\")\n  usedAt    DateTime? @map(\"used_at\")\n  createdAt DateTime  @default(now()) @map(\"created_at\")\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@map(\"email_otps\")\n}\n\nmodel PhoneOTP {\n  id        String    @id @default(uuid()) @db.Uuid\n  phone     String    @unique @map(\"phone\")\n  purpose   String\n  otpHash   String    @map(\"otp_hash\")\n  attempts  Int       @default(0) @db.SmallInt\n  expiresAt DateTime  @default(dbgenerated(\"(now() + '00:10:00'::interval)\")) @map(\"expires_at\")\n  usedAt    DateTime? @map(\"used_at\")\n  createdAt DateTime  @default(now()) @map(\"created_at\")\n\n  @@map(\"phone_otps\")\n}\n\nmodel UserProfile {\n  id                   String        @id @default(uuid()) @db.Uuid\n  userId               String        @unique @map(\"user_id\") @db.Uuid\n  currentLevel         CurrentLevel? @map(\"current_level\")\n  stream               Stream?\n  tenthPercentage      Decimal?      @map(\"tenth_percentage\") @db.Decimal(5, 2)\n  twelfthPercentage    Decimal?      @map(\"twelfth_percentage\") @db.Decimal(5, 2)\n  ugCgpa               Decimal?      @map(\"ug_cgpa\") @db.Decimal(4, 2)\n  ugInstitution        String?       @map(\"ug_institution\")\n  ugGraduationYear     Int?          @map(\"ug_graduation_year\") @db.SmallInt\n  fieldOfStudy         String?       @map(\"field_of_study\")\n  targetDegree         TargetDegree? @map(\"target_degree\")\n  targetCountries      String[]      @default([]) @map(\"target_countries\")\n  targetFields         String[]      @default([]) @map(\"target_fields\")\n  budgetMinUsd         Int?          @map(\"budget_min_usd\")\n  budgetMaxUsd         Int?          @map(\"budget_max_usd\")\n  city                 String?\n  state                String?\n  nationality          String        @default(\"Indian\")\n  financialAidNeeded   Boolean       @default(false) @map(\"financial_aid_needed\")\n  workExperienceMonths Int           @default(0) @map(\"work_experience_months\")\n  gapYearMonths        Int           @default(0) @map(\"gap_year_months\")\n  extracurriculars     String[]      @default([])\n  customSections       Json          @default(\"{}\") @map(\"custom_sections\")\n  profileStrength      Int           @default(0) @map(\"profile_strength\") @db.SmallInt\n  isPublic             Boolean       @default(false) @map(\"is_public\")\n  publicSlug           String?       @unique @map(\"public_slug\")\n  createdAt            DateTime      @default(now()) @map(\"created_at\")\n  updatedAt            DateTime      @updatedAt @map(\"updated_at\")\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@map(\"user_profiles\")\n}\n\nmodel TestScore {\n  id          String    @id @default(uuid()) @db.Uuid\n  userId      String    @map(\"user_id\") @db.Uuid\n  examName    String    @map(\"exam_name\") // Could use enum but SQL uses CHECK constraint\n  score       Decimal   @db.Decimal(8, 2)\n  maxScore    Decimal   @map(\"max_score\") @db.Decimal(8, 2)\n  percentile  Decimal?  @db.Decimal(5, 2)\n  subScores   Json?     @map(\"sub_scores\")\n  examDate    DateTime? @map(\"exam_date\") @db.Date\n  validUntil  DateTime? @map(\"valid_until\") @db.Date\n  isLatest    Boolean   @default(true) @map(\"is_latest\")\n  isVerified  Boolean   @default(false) @map(\"is_verified\")\n  documentUrl String?   @map(\"document_url\")\n  createdAt   DateTime  @default(now()) @map(\"created_at\")\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@map(\"test_scores\")\n}\n\nmodel EducationHistory {\n  id              String    @id @default(uuid()) @db.Uuid\n  userId          String    @map(\"user_id\") @db.Uuid\n  institutionName String    @map(\"institution_name\")\n  degree          String?\n  field           String?\n  gpa             Decimal?  @db.Decimal(4, 2)\n  gpaScale        Decimal?  @default(10) @map(\"gpa_scale\") @db.Decimal(4, 2)\n  percentage      Decimal?  @db.Decimal(5, 2)\n  country         String?\n  startDate       DateTime? @map(\"start_date\") @db.Date\n  endDate         DateTime? @map(\"end_date\") @db.Date\n  isCurrent       Boolean   @default(false) @map(\"is_current\")\n  createdAt       DateTime  @default(now()) @map(\"created_at\")\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@map(\"education_history\")\n}\n\nmodel UserDocument {\n  id                 String             @id @default(uuid()) @db.Uuid\n  userId             String             @map(\"user_id\") @db.Uuid\n  docType            DocType            @map(\"doc_type\")\n  fileName           String             @map(\"file_name\")\n  fileUrl            String             @map(\"file_url\")\n  fileSizeBytes      BigInt?            @map(\"file_size_bytes\")\n  mimeType           String?            @map(\"mime_type\")\n  verificationStatus VerificationStatus @default(pending) @map(\"verification_status\")\n  verifiedById       String?            @map(\"verified_by_id\") @db.Uuid\n  verifiedAt         DateTime?          @map(\"verified_at\")\n  notes              String?\n  createdAt          DateTime           @default(now()) @map(\"created_at\")\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@map(\"user_documents\")\n}\n\nmodel FeedPost {\n  id            String       @id @default(uuid()) @db.Uuid\n  authorId      String       @map(\"author_id\") @db.Uuid\n  title         String\n  slug          String       @unique\n  content       String       @db.Text\n  excerpt       String?\n  coverImageUrl String?      @map(\"cover_image_url\")\n  category      FeedCategory\n  tags          String[]     @default([])\n  status        PostStatus   @default(draft)\n  universityId  String?      @map(\"university_id\") @db.Uuid\n  isPinned      Boolean      @default(false) @map(\"is_pinned\")\n  viewCount     Int          @default(0) @map(\"view_count\")\n  likeCount     Int          @default(0) @map(\"like_count\")\n  dislikeCount  Int          @default(0) @map(\"dislike_count\")\n  bookmarkCount Int          @default(0) @map(\"bookmark_count\")\n  metadata      Json?        @default(\"{}\")\n  publishedAt   DateTime?    @map(\"published_at\")\n  createdAt     DateTime     @default(now()) @map(\"created_at\")\n  updatedAt     DateTime     @updatedAt @map(\"updated_at\")\n\n  author       User              @relation(fields: [authorId], references: [id], onDelete: NoAction, onUpdate: NoAction)\n  university   University?       @relation(fields: [universityId], references: [id], onDelete: Cascade)\n  interactions FeedInteraction[]\n\n  @@map(\"feed_posts\")\n}\n\nmodel FeedInteraction {\n  id        String          @id @default(uuid()) @db.Uuid\n  userId    String          @map(\"user_id\") @db.Uuid\n  postId    String          @map(\"post_id\") @db.Uuid\n  type      InteractionType\n  createdAt DateTime        @default(now()) @map(\"created_at\")\n\n  user User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  post FeedPost @relation(fields: [postId], references: [id], onDelete: Cascade)\n\n  @@unique([userId, postId, type])\n  @@map(\"feed_interactions\")\n}\n\nmodel University {\n  id              String          @id @default(uuid()) @db.Uuid\n  name            String\n  slug            String          @unique\n  country         String\n  city            String?\n  type            UniversityType?\n  qsRanking       Int?            @map(\"qs_ranking\")\n  theRanking      Int?            @map(\"the_ranking\")\n  websiteUrl      String?         @map(\"website_url\")\n  logoUrl         String?         @map(\"logo_url\")\n  bannerUrl       String?         @map(\"banner_url\")\n  description     String?         @db.Text\n  acceptanceRate  Decimal?        @map(\"acceptance_rate\") @db.Decimal(5, 2)\n  totalStudents   Int?            @map(\"total_students\")\n  intlStudentsPct Decimal?        @map(\"intl_students_pct\") @db.Decimal(5, 2)\n  establishedYear Int?            @map(\"established_year\") @db.SmallInt\n  campusSizeAcres Int?            @map(\"campus_size_acres\")\n  notableAlumni   String[]        @default([]) @map(\"notable_alumni\")\n  tags            String[]        @default([])\n  isActive        Boolean         @default(true) @map(\"is_active\")\n  dataVerifiedAt  DateTime?       @map(\"data_verified_at\")\n  createdAt       DateTime        @default(now()) @map(\"created_at\")\n  updatedAt       DateTime        @updatedAt @map(\"updated_at\")\n\n  courses   UniversityCourse[]\n  feedPosts FeedPost[]\n\n  @@map(\"universities\")\n}\n\nmodel UniversityCourse {\n  id                  String     @id @default(uuid()) @db.Uuid\n  universityId        String     @map(\"university_id\") @db.Uuid\n  name                String\n  slug                String     @unique\n  degreeType          DegreeType @map(\"degree_type\")\n  field               String\n  subField            String?    @map(\"sub_field\")\n  durationYears       Decimal?   @map(\"duration_years\") @db.Decimal(3, 1)\n  language            String     @default(\"English\")\n  intakeMonths        Int[]      @map(\"intake_months\")\n  applicationDeadline DateTime?  @map(\"application_deadline\") @db.Date\n  isActive            Boolean    @default(true) @map(\"is_active\")\n  createdAt           DateTime   @default(now()) @map(\"created_at\")\n  updatedAt           DateTime   @updatedAt @map(\"updated_at\")\n\n  university   University         @relation(fields: [universityId], references: [id], onDelete: Cascade)\n  requirements CourseRequirement?\n  fees         CourseFee?\n  savedBy      SavedCollege[]\n  comparisons  AIComparison[]\n  actionPlans  ActionPlan[]\n  applications Application[]\n\n  @@map(\"university_courses\")\n}\n\nmodel CourseRequirement {\n  id                      String   @id @default(uuid()) @db.Uuid\n  courseId                String   @unique @map(\"course_id\") @db.Uuid\n  minGpa                  Decimal? @map(\"min_gpa\") @db.Decimal(4, 2)\n  avgGpa                  Decimal? @map(\"avg_gpa\") @db.Decimal(4, 2)\n  minPercentage           Decimal? @map(\"min_percentage\") @db.Decimal(5, 2)\n  avgPercentage           Decimal? @map(\"avg_percentage\") @db.Decimal(5, 2)\n  minIelts                Decimal? @map(\"min_ielts\") @db.Decimal(3, 1)\n  avgIelts                Decimal? @map(\"avg_ielts\") @db.Decimal(3, 1)\n  minToefl                Int?     @map(\"min_toefl\") @db.SmallInt\n  minPte                  Int?     @map(\"min_pte\") @db.SmallInt\n  minDuolingo             Int?     @map(\"min_duolingo\") @db.SmallInt\n  minSat                  Int?     @map(\"min_sat\") @db.SmallInt\n  minGreVerbal            Int?     @map(\"min_gre_verbal\") @db.SmallInt\n  minGreQuant             Int?     @map(\"min_gre_quant\") @db.SmallInt\n  avgGreQuant             Int?     @map(\"avg_gre_quant\") @db.SmallInt\n  minGmat                 Int?     @map(\"min_gmat\") @db.SmallInt\n  avgGmat                 Int?     @map(\"avg_gmat\") @db.SmallInt\n  workExpYears            Decimal? @map(\"work_exp_years\") @db.Decimal(3, 1)\n  workExpRequired         Boolean  @default(false) @map(\"work_exp_required\")\n  sopRequired             Boolean  @default(true) @map(\"sop_required\")\n  lorCount                Int      @default(2) @map(\"lor_count\") @db.SmallInt\n  cvRequired              Boolean  @default(true) @map(\"cv_required\")\n  portfolioRequired       Boolean  @default(false) @map(\"portfolio_required\")\n  specificCoursesRequired String?  @map(\"specific_courses_required\")\n  otherNotes              String?  @map(\"other_notes\")\n  updatedAt               DateTime @default(now()) @map(\"updated_at\")\n\n  course UniversityCourse @relation(fields: [courseId], references: [id], onDelete: Cascade)\n\n  @@map(\"course_requirements\")\n}\n\nmodel CourseFee {\n  id                   String   @id @default(uuid()) @db.Uuid\n  courseId             String   @unique @map(\"course_id\") @db.Uuid\n  tuitionPerYearUsd    Int?     @map(\"tuition_per_year_usd\")\n  avgLivingPerYearUsd  Int?     @map(\"avg_living_per_year_usd\")\n  applicationFeeUsd    Int      @default(0) @map(\"application_fee_usd\")\n  totalCostEstimateUsd Int?     @map(\"total_cost_estimate_usd\")\n  currencyLocal        String?  @map(\"currency_local\")\n  tuitionLocal         Int?     @map(\"tuition_local\")\n  scholarshipAvailable Boolean  @default(false) @map(\"scholarship_available\")\n  scholarshipAmountUsd Int?     @map(\"scholarship_amount_usd\")\n  scholarshipDetails   String?  @map(\"scholarship_details\")\n  feeWaiverAvailable   Boolean  @default(false) @map(\"fee_waiver_available\")\n  feeNotes             String?  @map(\"fee_notes\")\n  updatedAt            DateTime @default(now()) @map(\"updated_at\")\n\n  course UniversityCourse @relation(fields: [courseId], references: [id], onDelete: Cascade)\n\n  @@map(\"course_fees\")\n}\n\nmodel SavedCollege {\n  id       String           @id @default(uuid()) @db.Uuid\n  userId   String           @map(\"user_id\") @db.Uuid\n  courseId String           @map(\"course_id\") @db.Uuid\n  priority CollegePriority?\n  notes    String?\n  savedAt  DateTime         @default(now()) @map(\"saved_at\")\n\n  user   User             @relation(fields: [userId], references: [id], onDelete: Cascade)\n  course UniversityCourse @relation(fields: [courseId], references: [id], onDelete: Cascade)\n\n  @@unique([userId, courseId])\n  @@map(\"saved_colleges\")\n}\n\nmodel AIComparison {\n  id             String     @id @default(uuid()) @db.Uuid\n  userId         String     @map(\"user_id\") @db.Uuid\n  courseId       String     @map(\"course_id\") @db.Uuid\n  matchScore     Decimal    @map(\"match_score\") @db.Decimal(5, 2)\n  category       AICategory\n  scoreBreakdown Json       @default(\"{}\") @map(\"score_breakdown\")\n  strengths      String[]   @default([])\n  weaknesses     String[]   @default([])\n  suggestions    Json       @default(\"[]\")\n  alternatives   String[]   @default([]) @map(\"alternatives\") // Array of UUID strings\n  aiExplanation  String?    @map(\"ai_explanation\") @db.Text\n  modelVersion   String     @default(\"v1.0\") @map(\"model_version\")\n  processingMs   Int?       @map(\"processing_ms\")\n  cached         Boolean    @default(false)\n  createdAt      DateTime   @default(now()) @map(\"created_at\")\n  updatedAt      DateTime   @updatedAt @map(\"updated_at\")\n\n  user        User             @relation(fields: [userId], references: [id], onDelete: Cascade)\n  course      UniversityCourse @relation(fields: [courseId], references: [id], onDelete: Cascade)\n  actionPlans ActionPlan[]\n\n  @@unique([userId, courseId])\n  @@map(\"ai_comparisons\")\n}\n\nmodel ActionPlan {\n  id            String     @id @default(uuid()) @db.Uuid\n  userId        String     @map(\"user_id\") @db.Uuid\n  comparisonId  String     @map(\"comparison_id\") @db.Uuid\n  courseId      String     @map(\"course_id\") @db.Uuid\n  milestones    Json       @default(\"[]\")\n  targetIntake  String?    @map(\"target_intake\")\n  targetDate    DateTime?  @map(\"target_date\") @db.Date\n  status        PlanStatus @default(active)\n  completionPct Int        @default(0) @map(\"completion_pct\") @db.SmallInt\n  createdAt     DateTime   @default(now()) @map(\"created_at\")\n  updatedAt     DateTime   @updatedAt @map(\"updated_at\")\n\n  user       User             @relation(fields: [userId], references: [id], onDelete: Cascade)\n  comparison AIComparison     @relation(fields: [comparisonId], references: [id], onDelete: Cascade)\n  course     UniversityCourse @relation(fields: [courseId], references: [id], onDelete: Cascade)\n\n  @@unique([userId, courseId])\n  @@map(\"action_plans\")\n}\n\nmodel Application {\n  id                String              @id @default(uuid()) @db.Uuid\n  userId            String              @map(\"user_id\") @db.Uuid\n  universityId      String              @map(\"university_id\") @db.Uuid\n  courseId          String              @map(\"course_id\") @db.Uuid\n  comparisonId      String?             @map(\"comparison_id\") @db.Uuid\n  status            ApplicationStatus   @default(draft)\n  priority          ApplicationPriority @default(medium)\n  applicationFee    Decimal?            @map(\"application_fee\") @db.Decimal(10, 2)\n  feeStatus         FeeStatus           @default(unpaid) @map(\"fee_status\")\n  feePaidAt         DateTime?           @map(\"fee_paid_at\")\n  personalStatement String?             @map(\"personal_statement\") @db.Text\n  counsellorId      String?             @map(\"counsellor_id\") @db.Uuid\n  internalNotes     String?             @map(\"internal_notes\") @db.Text\n  appliedAt         DateTime?           @map(\"applied_at\")\n  decisionAt        DateTime?           @map(\"decision_at\")\n  createdAt         DateTime            @default(now()) @map(\"created_at\")\n  updatedAt         DateTime            @updatedAt @map(\"updated_at\")\n\n  user   User             @relation(fields: [userId], references: [id], onDelete: Cascade)\n  course UniversityCourse @relation(fields: [courseId], references: [id], onDelete: Cascade)\n\n  @@unique([userId, courseId])\n  @@map(\"applications\")\n}\n\n// --- COMMUNITY FEED ---\n\nenum CommunityCategory {\n  admissions\n  scholarships\n  visas\n  accommodation\n  career_advice\n  routine\n  general\n}\n\nenum VoteValue {\n  up\n  down\n}\n\nmodel CommunityPost {\n  id           String            @id @default(uuid()) @db.Uuid\n  authorId     String            @map(\"author_id\") @db.Uuid\n  title        String\n  content      String?           @db.Text\n  imageUrl     String?           @map(\"image_url\")\n  category     CommunityCategory @default(general)\n  tags         String[]          @default([])\n  isQuestion   Boolean           @default(false) @map(\"is_question\")\n  isAnonymous  Boolean           @default(false) @map(\"is_anonymous\")\n  voteScore    Int               @default(0) @map(\"vote_score\")\n  commentCount Int               @default(0) @map(\"comment_count\")\n  isPinned     Boolean           @default(false) @map(\"is_pinned\")\n  isDeleted    Boolean           @default(false) @map(\"is_deleted\")\n  createdAt    DateTime          @default(now()) @map(\"created_at\")\n  updatedAt    DateTime          @updatedAt @map(\"updated_at\")\n\n  author   User               @relation(\"CommunityAuthor\", fields: [authorId], references: [id], onDelete: Cascade)\n  comments CommunityComment[]\n  votes    CommunityVote[]\n\n  @@map(\"community_posts\")\n}\n\nmodel CommunityComment {\n  id        String   @id @default(uuid()) @db.Uuid\n  postId    String   @map(\"post_id\") @db.Uuid\n  authorId  String   @map(\"author_id\") @db.Uuid\n  parentId  String?  @map(\"parent_id\") @db.Uuid\n  text      String   @db.Text\n  isAnswer  Boolean  @default(false) @map(\"is_answer\")\n  isBest    Boolean  @default(false) @map(\"is_best\")\n  voteScore Int      @default(0) @map(\"vote_score\")\n  isDeleted Boolean  @default(false) @map(\"is_deleted\")\n  createdAt DateTime @default(now()) @map(\"created_at\")\n  updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n  post    CommunityPost      @relation(fields: [postId], references: [id], onDelete: Cascade)\n  author  User               @relation(\"CommunityCommenter\", fields: [authorId], references: [id], onDelete: Cascade)\n  parent  CommunityComment?  @relation(\"CommentReplies\", fields: [parentId], references: [id])\n  replies CommunityComment[] @relation(\"CommentReplies\")\n  votes   CommunityVote[]\n\n  @@map(\"community_comments\")\n}\n\nmodel CommunityVote {\n  id        String    @id @default(uuid()) @db.Uuid\n  userId    String    @map(\"user_id\") @db.Uuid\n  postId    String?   @map(\"post_id\") @db.Uuid\n  commentId String?   @map(\"comment_id\") @db.Uuid\n  value     VoteValue\n  createdAt DateTime  @default(now()) @map(\"created_at\")\n\n  user    User              @relation(\"CommunityVoter\", fields: [userId], references: [id], onDelete: Cascade)\n  post    CommunityPost?    @relation(fields: [postId], references: [id], onDelete: Cascade)\n  comment CommunityComment? @relation(fields: [commentId], references: [id], onDelete: Cascade)\n\n  @@unique([userId, postId])\n  @@unique([userId, commentId])\n  @@map(\"community_votes\")\n}\n",
  "inlineSchemaHash": "a5ce39da5b223e049b59e646738f33720f354e70ed7b149a7d0b48b7d995323e",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "prisma/client",
    "client",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"dbName\":\"users\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"passwordHash\",\"dbName\":\"password_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fullName\",\"dbName\":\"full_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"avatarUrl\",\"dbName\":\"avatar_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Role\",\"default\":\"student\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"emailVerified\",\"dbName\":\"email_verified\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"googleId\",\"dbName\":\"google_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"studentId\",\"dbName\":\"student_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authProvider\",\"dbName\":\"auth_provider\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"email\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deletedAt\",\"dbName\":\"deleted_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"lastLoginAt\",\"dbName\":\"last_login_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"refreshTokens\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RefreshToken\",\"relationName\":\"RefreshTokenToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"emailOtps\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EmailOTP\",\"relationName\":\"EmailOTPToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserProfile\",\"relationName\":\"UserToUserProfile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"testScores\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TestScore\",\"relationName\":\"TestScoreToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"educationHistory\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EducationHistory\",\"relationName\":\"EducationHistoryToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"documents\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserDocument\",\"relationName\":\"UserToUserDocument\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"feedPosts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FeedPost\",\"relationName\":\"FeedPostToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"feedInteractions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FeedInteraction\",\"relationName\":\"FeedInteractionToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"savedColleges\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SavedCollege\",\"relationName\":\"SavedCollegeToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"aiComparisons\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AIComparison\",\"relationName\":\"AIComparisonToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"actionPlans\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ActionPlan\",\"relationName\":\"ActionPlanToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"applications\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Application\",\"relationName\":\"ApplicationToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"apiKeys\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ApiKey\",\"relationName\":\"ApiKeyToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"communityPosts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CommunityPost\",\"relationName\":\"CommunityAuthor\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"communityComments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CommunityComment\",\"relationName\":\"CommunityCommenter\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"communityVotes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CommunityVote\",\"relationName\":\"CommunityVoter\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ApiKey\":{\"dbName\":\"api_keys\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"keyHash\",\"dbName\":\"key_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Role\",\"default\":\"admin\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastUsedAt\",\"dbName\":\"last_used_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiresAt\",\"dbName\":\"expires_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ownerId\",\"dbName\":\"owner_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"owner\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"ApiKeyToUser\",\"relationFromFields\":[\"ownerId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"RefreshToken\":{\"dbName\":\"refresh_tokens\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tokenHash\",\"dbName\":\"token_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"familyId\",\"dbName\":\"family_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deviceInfo\",\"dbName\":\"device_info\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ipAddress\",\"dbName\":\"ip_address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiresAt\",\"dbName\":\"expires_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"revokedAt\",\"dbName\":\"revoked_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"RefreshTokenToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"EmailOTP\":{\"dbName\":\"email_otps\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"purpose\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"otpHash\",\"dbName\":\"otp_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"attempts\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiresAt\",\"dbName\":\"expires_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"(now() + '00:15:00'::interval)\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"usedAt\",\"dbName\":\"used_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"EmailOTPToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PhoneOTP\":{\"dbName\":\"phone_otps\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phone\",\"dbName\":\"phone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"purpose\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"otpHash\",\"dbName\":\"otp_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"attempts\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiresAt\",\"dbName\":\"expires_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"(now() + '00:10:00'::interval)\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"usedAt\",\"dbName\":\"used_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"UserProfile\":{\"dbName\":\"user_profiles\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currentLevel\",\"dbName\":\"current_level\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CurrentLevel\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stream\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Stream\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tenthPercentage\",\"dbName\":\"tenth_percentage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"twelfthPercentage\",\"dbName\":\"twelfth_percentage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ugCgpa\",\"dbName\":\"ug_cgpa\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ugInstitution\",\"dbName\":\"ug_institution\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ugGraduationYear\",\"dbName\":\"ug_graduation_year\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fieldOfStudy\",\"dbName\":\"field_of_study\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"targetDegree\",\"dbName\":\"target_degree\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TargetDegree\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"targetCountries\",\"dbName\":\"target_countries\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"targetFields\",\"dbName\":\"target_fields\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"budgetMinUsd\",\"dbName\":\"budget_min_usd\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"budgetMaxUsd\",\"dbName\":\"budget_max_usd\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"city\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nationality\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"Indian\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"financialAidNeeded\",\"dbName\":\"financial_aid_needed\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"workExperienceMonths\",\"dbName\":\"work_experience_months\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gapYearMonths\",\"dbName\":\"gap_year_months\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"extracurriculars\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"customSections\",\"dbName\":\"custom_sections\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profileStrength\",\"dbName\":\"profile_strength\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isPublic\",\"dbName\":\"is_public\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"publicSlug\",\"dbName\":\"public_slug\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"UserToUserProfile\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TestScore\":{\"dbName\":\"test_scores\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"examName\",\"dbName\":\"exam_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"maxScore\",\"dbName\":\"max_score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"percentile\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"subScores\",\"dbName\":\"sub_scores\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"examDate\",\"dbName\":\"exam_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"validUntil\",\"dbName\":\"valid_until\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isLatest\",\"dbName\":\"is_latest\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isVerified\",\"dbName\":\"is_verified\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"documentUrl\",\"dbName\":\"document_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"TestScoreToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"EducationHistory\":{\"dbName\":\"education_history\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"institutionName\",\"dbName\":\"institution_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"degree\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"field\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gpa\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gpaScale\",\"dbName\":\"gpa_scale\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"default\":10,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"percentage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startDate\",\"dbName\":\"start_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"endDate\",\"dbName\":\"end_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isCurrent\",\"dbName\":\"is_current\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"EducationHistoryToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"UserDocument\":{\"dbName\":\"user_documents\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"docType\",\"dbName\":\"doc_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DocType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fileName\",\"dbName\":\"file_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fileUrl\",\"dbName\":\"file_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fileSizeBytes\",\"dbName\":\"file_size_bytes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mimeType\",\"dbName\":\"mime_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"verificationStatus\",\"dbName\":\"verification_status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"VerificationStatus\",\"default\":\"pending\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"verifiedById\",\"dbName\":\"verified_by_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"verifiedAt\",\"dbName\":\"verified_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"UserToUserDocument\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"FeedPost\":{\"dbName\":\"feed_posts\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authorId\",\"dbName\":\"author_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"slug\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"excerpt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"coverImageUrl\",\"dbName\":\"cover_image_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FeedCategory\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tags\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"PostStatus\",\"default\":\"draft\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"universityId\",\"dbName\":\"university_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isPinned\",\"dbName\":\"is_pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"viewCount\",\"dbName\":\"view_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"likeCount\",\"dbName\":\"like_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dislikeCount\",\"dbName\":\"dislike_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bookmarkCount\",\"dbName\":\"bookmark_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metadata\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"publishedAt\",\"dbName\":\"published_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"author\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"FeedPostToUser\",\"relationFromFields\":[\"authorId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"university\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"University\",\"relationName\":\"FeedPostToUniversity\",\"relationFromFields\":[\"universityId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"interactions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FeedInteraction\",\"relationName\":\"FeedInteractionToFeedPost\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"FeedInteraction\":{\"dbName\":\"feed_interactions\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"postId\",\"dbName\":\"post_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"InteractionType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"FeedInteractionToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"post\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FeedPost\",\"relationName\":\"FeedInteractionToFeedPost\",\"relationFromFields\":[\"postId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"userId\",\"postId\",\"type\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"userId\",\"postId\",\"type\"]}],\"isGenerated\":false},\"University\":{\"dbName\":\"universities\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"slug\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"city\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UniversityType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"qsRanking\",\"dbName\":\"qs_ranking\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"theRanking\",\"dbName\":\"the_ranking\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"websiteUrl\",\"dbName\":\"website_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"logoUrl\",\"dbName\":\"logo_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bannerUrl\",\"dbName\":\"banner_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"acceptanceRate\",\"dbName\":\"acceptance_rate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalStudents\",\"dbName\":\"total_students\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"intlStudentsPct\",\"dbName\":\"intl_students_pct\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"establishedYear\",\"dbName\":\"established_year\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"campusSizeAcres\",\"dbName\":\"campus_size_acres\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notableAlumni\",\"dbName\":\"notable_alumni\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tags\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dataVerifiedAt\",\"dbName\":\"data_verified_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"courses\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UniversityCourse\",\"relationName\":\"UniversityToUniversityCourse\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"feedPosts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FeedPost\",\"relationName\":\"FeedPostToUniversity\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"UniversityCourse\":{\"dbName\":\"university_courses\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"universityId\",\"dbName\":\"university_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"slug\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"degreeType\",\"dbName\":\"degree_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DegreeType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"field\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"subField\",\"dbName\":\"sub_field\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"durationYears\",\"dbName\":\"duration_years\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"language\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"English\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"intakeMonths\",\"dbName\":\"intake_months\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"applicationDeadline\",\"dbName\":\"application_deadline\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"university\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"University\",\"relationName\":\"UniversityToUniversityCourse\",\"relationFromFields\":[\"universityId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requirements\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CourseRequirement\",\"relationName\":\"CourseRequirementToUniversityCourse\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fees\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CourseFee\",\"relationName\":\"CourseFeeToUniversityCourse\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"savedBy\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SavedCollege\",\"relationName\":\"SavedCollegeToUniversityCourse\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comparisons\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AIComparison\",\"relationName\":\"AIComparisonToUniversityCourse\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"actionPlans\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ActionPlan\",\"relationName\":\"ActionPlanToUniversityCourse\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"applications\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Application\",\"relationName\":\"ApplicationToUniversityCourse\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CourseRequirement\":{\"dbName\":\"course_requirements\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseId\",\"dbName\":\"course_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"minGpa\",\"dbName\":\"min_gpa\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"avgGpa\",\"dbName\":\"avg_gpa\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"minPercentage\",\"dbName\":\"min_percentage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"avgPercentage\",\"dbName\":\"avg_percentage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"minIelts\",\"dbName\":\"min_ielts\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"avgIelts\",\"dbName\":\"avg_ielts\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"minToefl\",\"dbName\":\"min_toefl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"minPte\",\"dbName\":\"min_pte\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"minDuolingo\",\"dbName\":\"min_duolingo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"minSat\",\"dbName\":\"min_sat\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"minGreVerbal\",\"dbName\":\"min_gre_verbal\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"minGreQuant\",\"dbName\":\"min_gre_quant\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"avgGreQuant\",\"dbName\":\"avg_gre_quant\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"minGmat\",\"dbName\":\"min_gmat\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"avgGmat\",\"dbName\":\"avg_gmat\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"workExpYears\",\"dbName\":\"work_exp_years\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"workExpRequired\",\"dbName\":\"work_exp_required\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sopRequired\",\"dbName\":\"sop_required\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lorCount\",\"dbName\":\"lor_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":2,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cvRequired\",\"dbName\":\"cv_required\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"portfolioRequired\",\"dbName\":\"portfolio_required\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"specificCoursesRequired\",\"dbName\":\"specific_courses_required\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"otherNotes\",\"dbName\":\"other_notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UniversityCourse\",\"relationName\":\"CourseRequirementToUniversityCourse\",\"relationFromFields\":[\"courseId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CourseFee\":{\"dbName\":\"course_fees\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseId\",\"dbName\":\"course_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tuitionPerYearUsd\",\"dbName\":\"tuition_per_year_usd\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"avgLivingPerYearUsd\",\"dbName\":\"avg_living_per_year_usd\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"applicationFeeUsd\",\"dbName\":\"application_fee_usd\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalCostEstimateUsd\",\"dbName\":\"total_cost_estimate_usd\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currencyLocal\",\"dbName\":\"currency_local\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tuitionLocal\",\"dbName\":\"tuition_local\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"scholarshipAvailable\",\"dbName\":\"scholarship_available\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"scholarshipAmountUsd\",\"dbName\":\"scholarship_amount_usd\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"scholarshipDetails\",\"dbName\":\"scholarship_details\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"feeWaiverAvailable\",\"dbName\":\"fee_waiver_available\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"feeNotes\",\"dbName\":\"fee_notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UniversityCourse\",\"relationName\":\"CourseFeeToUniversityCourse\",\"relationFromFields\":[\"courseId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"SavedCollege\":{\"dbName\":\"saved_colleges\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseId\",\"dbName\":\"course_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"priority\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CollegePriority\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"savedAt\",\"dbName\":\"saved_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"SavedCollegeToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UniversityCourse\",\"relationName\":\"SavedCollegeToUniversityCourse\",\"relationFromFields\":[\"courseId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"userId\",\"courseId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"userId\",\"courseId\"]}],\"isGenerated\":false},\"AIComparison\":{\"dbName\":\"ai_comparisons\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseId\",\"dbName\":\"course_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"matchScore\",\"dbName\":\"match_score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AICategory\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"scoreBreakdown\",\"dbName\":\"score_breakdown\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"strengths\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"weaknesses\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"suggestions\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"[]\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"alternatives\",\"dbName\":\"alternatives\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"aiExplanation\",\"dbName\":\"ai_explanation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"modelVersion\",\"dbName\":\"model_version\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"v1.0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"processingMs\",\"dbName\":\"processing_ms\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cached\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"AIComparisonToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UniversityCourse\",\"relationName\":\"AIComparisonToUniversityCourse\",\"relationFromFields\":[\"courseId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"actionPlans\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ActionPlan\",\"relationName\":\"AIComparisonToActionPlan\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"userId\",\"courseId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"userId\",\"courseId\"]}],\"isGenerated\":false},\"ActionPlan\":{\"dbName\":\"action_plans\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comparisonId\",\"dbName\":\"comparison_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseId\",\"dbName\":\"course_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"milestones\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"[]\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"targetIntake\",\"dbName\":\"target_intake\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"targetDate\",\"dbName\":\"target_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"PlanStatus\",\"default\":\"active\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"completionPct\",\"dbName\":\"completion_pct\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"ActionPlanToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comparison\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AIComparison\",\"relationName\":\"AIComparisonToActionPlan\",\"relationFromFields\":[\"comparisonId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UniversityCourse\",\"relationName\":\"ActionPlanToUniversityCourse\",\"relationFromFields\":[\"courseId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"userId\",\"courseId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"userId\",\"courseId\"]}],\"isGenerated\":false},\"Application\":{\"dbName\":\"applications\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"universityId\",\"dbName\":\"university_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseId\",\"dbName\":\"course_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comparisonId\",\"dbName\":\"comparison_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ApplicationStatus\",\"default\":\"draft\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"priority\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ApplicationPriority\",\"default\":\"medium\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"applicationFee\",\"dbName\":\"application_fee\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"feeStatus\",\"dbName\":\"fee_status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"FeeStatus\",\"default\":\"unpaid\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"feePaidAt\",\"dbName\":\"fee_paid_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"personalStatement\",\"dbName\":\"personal_statement\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"counsellorId\",\"dbName\":\"counsellor_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"internalNotes\",\"dbName\":\"internal_notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"appliedAt\",\"dbName\":\"applied_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"decisionAt\",\"dbName\":\"decision_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"ApplicationToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UniversityCourse\",\"relationName\":\"ApplicationToUniversityCourse\",\"relationFromFields\":[\"courseId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"userId\",\"courseId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"userId\",\"courseId\"]}],\"isGenerated\":false},\"CommunityPost\":{\"dbName\":\"community_posts\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authorId\",\"dbName\":\"author_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imageUrl\",\"dbName\":\"image_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"CommunityCategory\",\"default\":\"general\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tags\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isQuestion\",\"dbName\":\"is_question\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isAnonymous\",\"dbName\":\"is_anonymous\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"voteScore\",\"dbName\":\"vote_score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"commentCount\",\"dbName\":\"comment_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isPinned\",\"dbName\":\"is_pinned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isDeleted\",\"dbName\":\"is_deleted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"author\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"CommunityAuthor\",\"relationFromFields\":[\"authorId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CommunityComment\",\"relationName\":\"CommunityCommentToCommunityPost\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"votes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CommunityVote\",\"relationName\":\"CommunityPostToCommunityVote\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CommunityComment\":{\"dbName\":\"community_comments\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"postId\",\"dbName\":\"post_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authorId\",\"dbName\":\"author_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parentId\",\"dbName\":\"parent_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"text\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isAnswer\",\"dbName\":\"is_answer\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isBest\",\"dbName\":\"is_best\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"voteScore\",\"dbName\":\"vote_score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isDeleted\",\"dbName\":\"is_deleted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"post\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CommunityPost\",\"relationName\":\"CommunityCommentToCommunityPost\",\"relationFromFields\":[\"postId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"author\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"CommunityCommenter\",\"relationFromFields\":[\"authorId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parent\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CommunityComment\",\"relationName\":\"CommentReplies\",\"relationFromFields\":[\"parentId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"replies\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CommunityComment\",\"relationName\":\"CommentReplies\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"votes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CommunityVote\",\"relationName\":\"CommunityCommentToCommunityVote\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CommunityVote\":{\"dbName\":\"community_votes\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"postId\",\"dbName\":\"post_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"commentId\",\"dbName\":\"comment_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"VoteValue\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"CommunityVoter\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"post\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CommunityPost\",\"relationName\":\"CommunityPostToCommunityVote\",\"relationFromFields\":[\"postId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comment\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CommunityComment\",\"relationName\":\"CommunityCommentToCommunityVote\",\"relationFromFields\":[\"commentId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"userId\",\"postId\"],[\"userId\",\"commentId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"userId\",\"postId\"]},{\"name\":null,\"fields\":[\"userId\",\"commentId\"]}],\"isGenerated\":false}},\"enums\":{\"Role\":{\"values\":[{\"name\":\"student\",\"dbName\":null},{\"name\":\"vendor\",\"dbName\":null},{\"name\":\"counsellor\",\"dbName\":null},{\"name\":\"admin\",\"dbName\":null},{\"name\":\"super_admin\",\"dbName\":null}],\"dbName\":null},\"VerificationStatus\":{\"values\":[{\"name\":\"pending\",\"dbName\":null},{\"name\":\"verified\",\"dbName\":null},{\"name\":\"rejected\",\"dbName\":null}],\"dbName\":null},\"FeedCategory\":{\"values\":[{\"name\":\"admissions\",\"dbName\":null},{\"name\":\"scholarships\",\"dbName\":null},{\"name\":\"exams\",\"dbName\":null},{\"name\":\"news\",\"dbName\":null},{\"name\":\"visa\",\"dbName\":null},{\"name\":\"events\",\"dbName\":null}],\"dbName\":null},\"PostStatus\":{\"values\":[{\"name\":\"draft\",\"dbName\":null},{\"name\":\"published\",\"dbName\":null},{\"name\":\"archived\",\"dbName\":null}],\"dbName\":null},\"InteractionType\":{\"values\":[{\"name\":\"like\",\"dbName\":null},{\"name\":\"dislike\",\"dbName\":null},{\"name\":\"bookmark\",\"dbName\":null},{\"name\":\"view\",\"dbName\":null}],\"dbName\":null},\"DegreeType\":{\"values\":[{\"name\":\"bachelors\",\"dbName\":null},{\"name\":\"masters\",\"dbName\":null},{\"name\":\"phd\",\"dbName\":null},{\"name\":\"diploma\",\"dbName\":null},{\"name\":\"certificate\",\"dbName\":null},{\"name\":\"associate\",\"dbName\":null}],\"dbName\":null},\"UniversityType\":{\"values\":[{\"name\":\"public\",\"dbName\":null},{\"name\":\"private\",\"dbName\":null},{\"name\":\"autonomous\",\"dbName\":null}],\"dbName\":null},\"AICategory\":{\"values\":[{\"name\":\"high\",\"dbName\":null},{\"name\":\"moderate\",\"dbName\":null},{\"name\":\"low\",\"dbName\":null},{\"name\":\"very_low\",\"dbName\":null}],\"dbName\":null},\"CollegePriority\":{\"values\":[{\"name\":\"reach\",\"dbName\":null},{\"name\":\"match\",\"dbName\":null},{\"name\":\"safety\",\"dbName\":null}],\"dbName\":null},\"ApplicationStatus\":{\"values\":[{\"name\":\"draft\",\"dbName\":null},{\"name\":\"submitted\",\"dbName\":null},{\"name\":\"pending\",\"dbName\":null},{\"name\":\"under_review\",\"dbName\":null},{\"name\":\"accepted\",\"dbName\":null},{\"name\":\"rejected\",\"dbName\":null},{\"name\":\"waitlisted\",\"dbName\":null},{\"name\":\"withdrawn\",\"dbName\":null}],\"dbName\":null},\"ApplicationPriority\":{\"values\":[{\"name\":\"urgent\",\"dbName\":null},{\"name\":\"high\",\"dbName\":null},{\"name\":\"medium\",\"dbName\":null},{\"name\":\"low\",\"dbName\":null}],\"dbName\":null},\"FeeStatus\":{\"values\":[{\"name\":\"unpaid\",\"dbName\":null},{\"name\":\"paid\",\"dbName\":null},{\"name\":\"waived\",\"dbName\":null}],\"dbName\":null},\"DocType\":{\"values\":[{\"name\":\"transcript\",\"dbName\":null},{\"name\":\"sop\",\"dbName\":null},{\"name\":\"lor\",\"dbName\":null},{\"name\":\"passport\",\"dbName\":null},{\"name\":\"cv_resume\",\"dbName\":null},{\"name\":\"english_test\",\"dbName\":null},{\"name\":\"financial_proof\",\"dbName\":null},{\"name\":\"other\",\"dbName\":null}],\"dbName\":null},\"PlanStatus\":{\"values\":[{\"name\":\"active\",\"dbName\":null},{\"name\":\"completed\",\"dbName\":null},{\"name\":\"abandoned\",\"dbName\":null}],\"dbName\":null},\"CurrentLevel\":{\"values\":[{\"name\":\"class_10\",\"dbName\":null},{\"name\":\"class_11\",\"dbName\":null},{\"name\":\"class_12\",\"dbName\":null},{\"name\":\"ug_year_1\",\"dbName\":null},{\"name\":\"ug_year_2\",\"dbName\":null},{\"name\":\"ug_year_3\",\"dbName\":null},{\"name\":\"ug_final\",\"dbName\":null},{\"name\":\"pg\",\"dbName\":null},{\"name\":\"phd\",\"dbName\":null},{\"name\":\"working_professional\",\"dbName\":null}],\"dbName\":null},\"Stream\":{\"values\":[{\"name\":\"science\",\"dbName\":null},{\"name\":\"commerce\",\"dbName\":null},{\"name\":\"arts\",\"dbName\":null},{\"name\":\"engineering\",\"dbName\":null},{\"name\":\"medicine\",\"dbName\":null},{\"name\":\"law\",\"dbName\":null},{\"name\":\"other\",\"dbName\":null}],\"dbName\":null},\"TargetDegree\":{\"values\":[{\"name\":\"bachelors\",\"dbName\":null},{\"name\":\"masters\",\"dbName\":null},{\"name\":\"phd\",\"dbName\":null},{\"name\":\"mba\",\"dbName\":null},{\"name\":\"diploma\",\"dbName\":null}],\"dbName\":null},\"CommunityCategory\":{\"values\":[{\"name\":\"admissions\",\"dbName\":null},{\"name\":\"scholarships\",\"dbName\":null},{\"name\":\"visas\",\"dbName\":null},{\"name\":\"accommodation\",\"dbName\":null},{\"name\":\"career_advice\",\"dbName\":null},{\"name\":\"routine\",\"dbName\":null},{\"name\":\"general\",\"dbName\":null}],\"dbName\":null},\"VoteValue\":{\"values\":[{\"name\":\"up\",\"dbName\":null},{\"name\":\"down\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "query_engine-windows.dll.node");
path.join(process.cwd(), "prisma/client/query_engine-windows.dll.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "prisma/client/schema.prisma")
