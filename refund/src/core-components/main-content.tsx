import { cx } from "class-variance-authority";

interface MainContentProps extends React.ComponentProps<"main"> {}

export default function MainContent({
  className,
  children,
  ...props
}: MainContentProps) {
  return (
    <>
      <main
        className={cx(
          "p-2 md:p-10 w-full flex item-center justify-center align-center  ",
          className
        )}
        {...props}
      >
        {children}
      </main>
    </>
  );
}
