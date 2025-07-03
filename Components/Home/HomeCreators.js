import Link from "next/link";
import React, { memo } from "react";

const HomeCreators = memo(() => {
  return (
    <>
      <section className="section-creators">
        <div className="grid grid-cols-1 grid-flow-row-dense lg:grid-cols-3 gap-12 place-items-center">
          <div className="col-span-1 lg:col-span-2">
            <div className="creators-content">
              <div className="creators-heading flex flex-col gap-10">
                <div className="">
                  <div className="creators-title">Creators. Fans.</div>
                  <div className="creators-title">
                    Nothing in <span className="block">between.</span>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-6">
                    <div className="creators-subtitle w-full md:w-2/4">
                      Patreon gives you a direct line of access to your fan
                      community, with no ads or algorithms in the way.
                    </div>
                    <div className="creators-subtitle w-full md:w-2/4">
                      Through real-time group chats, comments, DMs and even
                      directly over email, you can connect more deeply and
                      directly with your community here than anywhere else..
                    </div>
                  </div>

                  <div className="creator-link mt-4">
                    <Link href={"/"} className="btn-primary">
                      Build real community
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="creators-video col-span-1">
            <video
              width="640"
              height="360"
              preload="none"
              loop
              autoPlay
              muted
              loading="lazy"
              playsInline
              className="rounded-lg shadow-lg"
            >
              <source src="assets/videos/mov.webm" type="video/webm" />
              Your browser does not support the video tag
            </video>
          </div>
        </div>
      </section>
    </>
  );
});

export default memo(HomeCreators);
