
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


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

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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
  likeCount: 'likeCount',
  dislikeCount: 'dislikeCount',
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
  likeCount: 'likeCount',
  dislikeCount: 'dislikeCount',
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
  like: 'like',
  dislike: 'dislike'
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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
