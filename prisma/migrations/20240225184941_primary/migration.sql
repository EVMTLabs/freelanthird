-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "skills" TEXT[],
    "size" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "location" TEXT NOT NULL DEFAULT 'Remote',
    "minPrice" INTEGER NOT NULL,
    "maxPrice" INTEGER NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);
