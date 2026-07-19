import { Link } from "react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  BuildingOffice2Icon,
  CheckCircleIcon,
  HeartIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    label: "Delivery kit checklists",
    Icon: CheckCircleIcon,
  },
  {
    label: "Clinic information and reminders",
    Icon: BuildingOffice2Icon,
  },
  {
    label: "Community support requests",
    Icon: LifebuoyIcon,
  },
];

function SignInPage() {
  return (
    <main className="min-h-screen bg-background xl:grid xl:grid-cols-[0.9fr_1.1fr]">
      {/* Side panel fro desktop only */}
      <aside className="relative hidden min-h-screen overflow-hidden bg-linear-to-br from-primary via-[#d53c48] to-brand-orange text-white xl:flex">
        

        {/*  content */}
        <div className="relative z-10 flex w-full flex-col px-12 py-10 xl:px-18 xl:py-14">
          {/* Logo */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3 text-white"
              aria-label="Go to AmaiReady home page"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-white/20 text-2xl shadow-sm backdrop-blur-sm">
                 <HeartIcon
                    className="size-7 text-white"
                    aria-hidden="true"
                />
              </span>

              <span className="font-heading text-3xl font-bold">
                AmaiReady
              </span>
            </Link>

            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/75">
              Maternal delivery support
            </p>
          </div>

          {/* Main text */}
          <div className="my-auto max-w-xl">
            <h1 className="font-heading text-5xl leading-tight font-bold xl:text-6xl">
              Preparing every mother for a{" "}
              <span className="text-brand-gold">
                safe delivery.
              </span>
            </h1>
          </div>

          <p className="text-sm text-white/65">
            Preparation support only. AmaiReady does not replace
            professional medical advice.
          </p>
        </div>
      </aside>

      {/* Form section */}
      <section className="flex min-h-dvh min-w-0 items-start justify-center px-4 py-6 sm:px-6 sm:py-10 xl:items-center xl:px-12 2xl:px-20">
        <div className="w-full min-w-0 max-w-xl">
          {/* Mobile styling */}
          <div className="mb-6 xl:hidden">
            <Link
              to="/"
              className="inline-flex items-center gap-3 text-primary"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-primary text-xl text-white">
                  <HeartIcon
                    className="size-6"
                    aria-hidden="true"
                />
              </span>

              <span className="font-heading text-3xl font-bold">
                AmaiReady
              </span>
            </Link>

            <p className="mt-3 text-sm text-muted-foreground">
              Maternal delivery preparation and support.
            </p>
          </div>

          {/* Sign-in card */}
         <Card className="w-full min-w-0 gap-0 overflow-hidden border-border bg-card py-0 shadow-none sm:shadow-sm">            
            <CardHeader className="space-y-2 px-5 pt-6 sm:space-y-3 sm:px-8 sm:pt-8">

              <CardTitle className="font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl xl:text-5xl">
                Sign in to your account
              </CardTitle>

              <CardDescription className="text-base leading-7 text-muted-foreground">
                Start preparing for your delivery with clearer
                guidance and support.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-5 pb-6 sm:px-8 sm:pb-8">
              {/* Temporary form placeholder */}
              <div className="rounded-xl border border-dashed border-border bg-muted/40 px-5 py-12 text-center">
                <p className="font-semibold text-foreground">
                  Sign-in form
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  We will add the name, email and password fields next.
                </p>
              </div>

              <p className="mt-7 text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-bold text-primary underline-offset-4 hover:underline"
                >
                  Register
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

export default SignInPage;