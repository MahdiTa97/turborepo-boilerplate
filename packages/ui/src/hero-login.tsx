'use client';

import type { ReactNode } from 'react';
import { Button, Card, Form, Hero, Input } from 'react-daisyui';

export function HeroLogin(): ReactNode {
  return (
    <Hero>
      <Hero.Content className="flex-col px-5  py-24 lg:flex-row-reverse lg:gap-12">
        <div className="text-center lg:text-start">
          <h1 className="text-5xl font-bold">ثبت‌نام کنید!</h1>
          <p className="py-6">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ لورم ایپسوم متن
            ساختگی با تولید سادگی نامفهوم از صنعت چاپ
          </p>
        </div>
        <Card className="bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <Card.Body>
            <Form className="w-full flex-col gap-2">
              <div className="w-full">
                <Form.Label title="ایمیل" />
                <Input
                  className="input-bordered w-full"
                  placeholder="ایمیل"
                  type="text"
                />
              </div>
              <div className="w-full">
                <Form.Label title="پسورد" />
                <Input
                  className="input-bordered w-full"
                  placeholder="پسورد"
                  type="text"
                />
              </div>
            </Form>
            <div className="mt-6">
              <Button color="secondary">ثبت‌نام</Button>
            </div>
          </Card.Body>
        </Card>
      </Hero.Content>
    </Hero>
  );
}
