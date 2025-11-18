"use client";

import { useFormContext, useWatch } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { toast } from "sonner";
import { WeddingPageProps } from "@/types/wedding";
import { saveWedding } from "@/lib/firestore/weddings";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { fadeInScale } from "@/lib/animations";
import { MIN_LOADING_TIME } from "@/constants/loading";
import { GalleryEditor } from "./GalleryEditor";
import { useEffect } from "react";
import { generateGoogleCalendarLink } from "@/lib/calendar";
import { vi } from "date-fns/locale";

interface EditorFormProps {
  onSubmittingChange?: (submitting: boolean) => void;
  onSaved?: (slug: string) => void;
}

export default function EditorForm({
  onSubmittingChange,
  onSaved,
}: EditorFormProps) {
  const { user } = useUser();
  const form = useFormContext<WeddingPageProps>();

  const onSubmit = async (values: WeddingPageProps) => {
    if (!user?.id) return;

    onSubmittingChange?.(true); // báo parent đang submit

    try {
      const savePromise = saveWedding({ ...values, userId: user.id });
      const minDelay = new Promise((resolve) =>
        setTimeout(resolve, MIN_LOADING_TIME)
      );

      // Chờ cả 2 promise xong
      const slug = await Promise.all([savePromise, minDelay]).then(
        ([slug]) => slug
      );

      toast.success("Thông tin đã được cập nhật!");
      onSaved?.(slug);

      return slug;
    } catch (error) {
      console.error("Error saving wedding:", error);
      toast.error("Lưu thông tin thất bại!");
    } finally {
      onSubmittingChange?.(false); // báo parent xong submit
    }
  };

  const handleReset = () => {
    form.reset();
    toast("Đã đặt lại thông tin mặc định");
  };

  const couple = useWatch({ control: form.control, name: "couple" });
  const event = useWatch({ control: form.control, name: "event" });

  const isPastWedding = event?.datetime
    ? new Date(event.datetime).getTime() < new Date().getTime()
    : false;
  // const isPastWedding = true;

  useEffect(() => {
    if (!couple || !event) return;

    const newUrl = generateGoogleCalendarLink({
      couple: {
        bride: couple.bride || "",
        groom: couple.groom || "",
      },
      event: {
        date: event.date || "",
        datetime: event.datetime || "",
        time: event.time || "",
        venue: event.venue || "",
        address: event.address || "",
      },
    });

    // 🔍 Chỉ cập nhật nếu URL thay đổi thực sự
    const currentUrl = form.getValues("event.calendarUrl");
    if (currentUrl !== newUrl) {
      form.setValue("event.calendarUrl", newUrl, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }
  }, [
    couple.bride,
    couple.groom,
    event.date,
    event.datetime,
    event.time,
    event.venue,
    event.address,
    form,
    couple,
    event,
  ]);
  return (
    <Form {...form}>
      <motion.form
        {...fadeInScale(0)}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto p-6"
      >
        {/* Cặp đôi */}
        <h2
          className="text-2xl font-semibold text-neutral-900 mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Thông Tin Cặp Đôi
        </h2>

        <FormField
          control={form.control}
          name="couple.bride"
          rules={{ required: "Tên cô dâu không được để trống" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                Tên Cô Dâu
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập tên cô dâu"
                  className="h-11 text-base"
                  {...field}
                  disabled={isPastWedding}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="couple.groom"
          rules={{ required: "Tên chú rể không được để trống" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                Tên Chú Rể
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập tên chú rể"
                  className="h-11 text-base"
                  {...field}
                  disabled={isPastWedding}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sự kiện */}
        <h2
          className="text-2xl font-semibold text-neutral-900 mb-4 mt-10"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Thông Tin Sự Kiện
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="event.datetime"
            rules={{ required: "Ngày cưới không được để trống" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Ngày Cưới
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className="w-full justify-between h-11 text-base font-light"
                        disabled={isPastWedding}
                      >
                        {field.value
                          ? format(new Date(field.value), "dd/MM/yyyy")
                          : "Chọn ngày"}
                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50 shadow-md">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        if (!date) return;

                        const d = new Date(date); // lấy ngày mới từ calendar
                        if (field.value) {
                          const prev = new Date(field.value);
                          // giữ giờ, phút, giây từ datetime cũ
                          d.setHours(
                            prev.getHours(),
                            prev.getMinutes(),
                            prev.getSeconds(),
                            0
                          );
                        }

                        field.onChange(d.toISOString());
                      }}
                      locale={vi}
                      disabled={isPastWedding}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="event.datetime"
            rules={{ required: "Thời gian không được để trống" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Thời Gian
                </FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    value={
                      field.value
                        ? `${new Date(field.value)
                            .getHours()
                            .toString()
                            .padStart(2, "0")}:${new Date(field.value)
                            .getMinutes()
                            .toString()
                            .padStart(2, "0")}`
                        : "11:11"
                    }
                    onChange={(e) => {
                      if (!field.value) return;
                      const d = new Date(field.value);
                      const [h, m] = e.target.value.split(":").map(Number);
                      d.setHours(h, m, 0, 0);
                      field.onChange(d.toISOString());
                    }}
                    step={60}
                    className="h-11 text-base bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                    disabled={isPastWedding}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="event.venue"
          rules={{ required: "Tên địa điểm không được để trống" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                Tên Địa Điểm
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="VD: Nhà Hàng Tiệc Cưới"
                  className="h-11 text-base"
                  {...field}
                  disabled={isPastWedding}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="event.address"
          rules={{ required: "Địa chỉ không được để trống" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Địa Chỉ</FormLabel>
              <FormControl>
                <Input
                  placeholder="VD: 123 Đường Bất Kỳ, Thành Phố"
                  className="h-11 text-base"
                  {...field}
                  disabled={isPastWedding}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="event.mapUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                Liên Kết Bản Đồ
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="https://maps.google.com/..."
                  className="h-11 text-base"
                  {...field}
                  disabled={isPastWedding}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="event.calendarUrl"
          // render={({ field }) => (
          //   <FormItem>
          //     <FormLabel className="text-base font-medium">
          //       Liên Kết Lịch
          //     </FormLabel>
          //     <FormControl>
          //       <Input
          //         placeholder="https://calendar.google.com/..."
          //         className="h-11 text-base"
          //         {...field}
          //       />
          //     </FormControl>
          //     <FormMessage />
          //   </FormItem>
          // )}
          render={({ field }) => <input type="hidden" {...field} />}
        />

        {/* Bộ Sưu Tập Ảnh */}
        <h2
          className="text-2xl font-semibold text-neutral-900 mb-4 mt-10"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Bộ Sưu Tập Ảnh
        </h2>

        <FormField
          control={form.control}
          name="gallery"
          render={({ field }) => (
            <GalleryEditor field={field} disabled={isPastWedding} />
          )}
        />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            type="submit"
            className="flex-1 bg-[#b9a27f] hover:bg-[#a89370] h-11 text-base font-medium"
            disabled={form.formState.isSubmitting || isPastWedding}
          >
            {form.formState.isSubmitting ? "Đang lưu..." : "Lưu Thay Đổi"}
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={handleReset}
            className="flex-1 h-11 text-base font-medium"
            disabled={isPastWedding}
          >
            Đặt Lại
          </Button>
        </div>
      </motion.form>
    </Form>
  );
}
