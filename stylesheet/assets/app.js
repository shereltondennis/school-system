const toast = (message, type = "success") => {
  const oldToast = document.querySelector(".toast");
  if (oldToast) oldToast.remove();

  const item = document.createElement("div");
  item.className = `toast ${type}`;
  item.textContent = message;
  document.body.appendChild(item);
  setTimeout(() => item.remove(), 2400);
};

const moneyToNumber = (value) => Number(String(value).replace(/[^0-9.-]/g, "")) || 0;
const formatMoney = (value) => `$${Number(value).toLocaleString()}`;

const teacherLoginAccounts = [
  { id: "T-201", name: "Ms. Evelyn Cole", email: "e.cole@school.edu", password: "teacher123" },
  { id: "T-202", name: "Mr. Samuel Wright", email: "s.wright@school.edu", password: "teacher123" },
  { id: "T-203", name: "Mrs. Hannah Brooks", email: "h.brooks@school.edu", password: "teacher123" },
  { id: "T-204", name: "Mr. Daniel Price", email: "d.price@school.edu", password: "teacher123" },
  { id: "T-205", name: "Ms. Olivia Grant", email: "o.grant@school.edu", password: "teacher123" },
  { id: "T-206", name: "Mr. Marcus Reed", email: "m.reed@school.edu", password: "teacher123" },
  { id: "T-207", name: "Mrs. Sophia Bennett", email: "s.bennett@school.edu", password: "teacher123" },
  { id: "T-208", name: "Mr. Ethan Foster", email: "e.foster@school.edu", password: "teacher123" },
  { id: "T-209", name: "Ms. Grace Turner", email: "g.turner@school.edu", password: "teacher123" },
  { id: "T-210", name: "Mr. Isaac Morgan", email: "i.morgan@school.edu", password: "teacher123" },
  { id: "T-211", name: "Mrs. Lydia Hayes", email: "l.hayes@school.edu", password: "teacher123" },
  { id: "T-212", name: "Mr. Noah Carter", email: "n.carter@school.edu", password: "teacher123" },
  { id: "T-213", name: "Ms. Chloe Evans", email: "c.evans@school.edu", password: "teacher123" },
  { id: "T-214", name: "Mr. Aaron Phillips", email: "a.phillips@school.edu", password: "teacher123" },
  { id: "T-215", name: "Mrs. Victoria James", email: "v.james@school.edu", password: "teacher123" },
  { id: "T-216", name: "Mr. Caleb Scott", email: "c.scott@school.edu", password: "teacher123" },
  { id: "T-217", name: "Ms. Natalie Ward", email: "n.ward@school.edu", password: "teacher123" },
  { id: "T-218", name: "Mr. Adrian Bell", email: "a.bell@school.edu", password: "teacher123" },
  { id: "T-219", name: "Mrs. Leah Cooper", email: "l.cooper@school.edu", password: "teacher123" },
  { id: "T-220", name: "Mr. Owen Mitchell", email: "o.mitchell@school.edu", password: "teacher123" },
  { id: "T-221", name: "Ms. Penelope Hughes", email: "p.hughes@school.edu", password: "teacher123" },
  { id: "T-222", name: "Mr. Julian Rivera", email: "j.rivera@school.edu", password: "teacher123" },
  { id: "T-223", name: "Mrs. Maya Peterson", email: "m.peterson@school.edu", password: "teacher123" },
  { id: "T-224", name: "Mr. Connor Bailey", email: "c.bailey@school.edu", password: "teacher123" },
  { id: "T-225", name: "Ms. Abigail Simmons", email: "a.simmons@school.edu", password: "teacher123" },
];

const credentials = {
  Admin: { email: "admin@bfs.edu", password: "admin123", page: "darshboard.html", name: "Admin User" },
  Teacher: { email: "teacher@bfs.edu", password: "teacher123", page: "teacher-portal.html", name: "Ms. Evelyn Cole", id: "T-201" },
  Student: { email: "student@bfs.edu", password: "student123", page: "student-portal.html", name: "Amara Johnson" },
  Parent: { email: "parent@bfs.edu", password: "parent123", page: "parent-portal.html", name: "Mrs. Johnson" },
};

const getCurrentUser = () => {
  try {
    return JSON.parse(sessionStorage.getItem("currentUser")) || null;
  } catch {
    return null;
  }
};

const setupAccessControl = () => {
  const page = location.pathname.split("/").pop() || "index.html";
  const publicPages = ["index.html", "login.html", ""];
  const portalAccess = {
    "teacher-portal.html": ["Teacher", "Admin"],
    "student-portal.html": ["Student", "Admin"],
    "parent-portal.html": ["Parent", "Admin"],
  };
  const adminPages = [
    "darshboard.html",
    "teachers.html",
    "student.html",
    "subjects.html",
    "classes.html",
    "attendance.html",
    "grades.html",
    "fees.html",
    "calender.html",
    "settings.html",
  ];

  document.querySelectorAll('a[href="index.html"]').forEach((link) => {
    link.addEventListener("click", () => sessionStorage.removeItem("currentUser"));
  });

  if (publicPages.includes(page)) return true;

  const currentUser = getCurrentUser();
  if (!currentUser) {
    location.href = "login.html";
    return false;
  }

  const allowedRoles = portalAccess[page] || (adminPages.includes(page) ? ["Admin"] : []);
  if (allowedRoles.length && !allowedRoles.includes(currentUser.role)) {
    location.href = currentUser.home || "login.html";
    return false;
  }

  return true;
};

const setupSearch = () => {
  document.querySelectorAll('input[placeholder*="Search"]').forEach((input) => {
    const table = input.closest(".card")?.nextElementSibling?.matches("table")
      ? input.closest(".card").nextElementSibling
      : document.querySelector("table");

    if (!table) return;

    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      table.querySelectorAll("tbody tr").forEach((row) => {
        row.classList.toggle("is-hidden", !row.textContent.toLowerCase().includes(query));
      });
    });
  });
};

const tableCell = (value) => {
  const cell = document.createElement("td");
  cell.innerHTML = value;
  return cell;
};

const addRowFromForm = (form) => {
  const pageTitle = document.querySelector(".topbar h1")?.textContent.trim() || document.title;
  const values = Array.from(form.querySelectorAll("input, select, textarea"))
    .filter((field) => field.type !== "file")
    .map((field) => field.value.trim() || field.placeholder || "Pending");

  const table = form.closest(".card")?.previousElementSibling?.matches("table")
    ? form.closest(".card").previousElementSibling
    : document.querySelector("table");

  if (!table || values.length === 0) {
    toast("Nothing to save yet.", "error");
    return;
  }

  const row = document.createElement("tr");
  const rows = table.querySelectorAll("tbody tr").length + 1;

  if (pageTitle === "Students") {
    row.append(
      tableCell(`S-${1020 + rows}`),
      tableCell(values[0]),
      tableCell(values[1]),
      tableCell(values[2]),
      tableCell('<span class="badge ok">Active</span>')
    );
  } else if (pageTitle === "Teachers") {
    row.append(
      tableCell(`T-${200 + rows}`),
      tableCell(values[0]),
      tableCell(values[2]),
      tableCell(values[3]),
      tableCell(values[1]),
      tableCell('<span class="badge ok">Active</span>')
    );
  } else if (pageTitle === "Classes") {
    row.append(tableCell(values[0]), tableCell(values[1]), tableCell(values[2]), tableCell("0"), tableCell(values[3]));
  } else if (pageTitle === "Subjects") {
    row.append(tableCell(values[0]), tableCell(values[1]), tableCell(values[2]), tableCell(values[3]));
  } else {
    values.forEach((value) => row.append(tableCell(value)));
  }

  table.querySelector("tbody").appendChild(row);
  form.reset();
  toast(`${pageTitle.replace(" Management", "")} saved.`);
};

const setupForms = () => {
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (event) => event.preventDefault());
  });

  document.querySelectorAll("button").forEach((button) => {
    const label = button.textContent.trim();
    if (!label.startsWith("Save ") || label === "Save Attendance" || label === "Save Changes") return;

    button.addEventListener("click", () => {
      const requiredFields = Array.from(button.closest("form")?.querySelectorAll("input, select, textarea") || [])
        .filter((field) => field.type !== "file" && !field.value.trim());
      if (requiredFields.length) {
        requiredFields[0].focus();
        toast("Fill in the empty fields first.", "error");
        return;
      }
      addRowFromForm(button.closest("form"));
    });
  });
};

const setupAttendance = () => {
  document.querySelectorAll(".attendance-toggle").forEach((group) => {
    group.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        group.querySelectorAll("button").forEach((item) => item.classList.remove("active", "absent"));
        button.classList.add("active");
        if (button.textContent.trim() === "Absent") button.classList.add("absent");
      });
    });
  });

  const saveAttendance = Array.from(document.querySelectorAll("button")).find((button) => button.textContent.trim() === "Save Attendance");
  if (saveAttendance) {
    saveAttendance.addEventListener("click", () => {
      const present = document.querySelectorAll(".attendance-toggle button.active:not(.absent)").length;
      const absent = document.querySelectorAll(".attendance-toggle button.absent.active").length;
      toast(`Attendance saved: ${present} present, ${absent} absent.`);
    });
  }
};

const setupSettingsTabs = () => {
  const tabs = document.querySelectorAll(".tabs .tab");
  if (!tabs.length) return;

  const cards = Array.from(document.querySelectorAll(".tabs ~ .card"));
  cards.forEach((card, index) => card.classList.toggle("is-hidden", index !== 0));

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      cards.forEach((card) => card.classList.add("is-hidden"));
      tab.classList.add("active");
      cards[index]?.classList.remove("is-hidden");
    });
  });

  const save = Array.from(document.querySelectorAll("button")).find((button) => button.textContent.trim() === "Save Changes");
  save?.addEventListener("click", () => toast("Settings saved."));
};

const setupTableActions = () => {
  document.querySelectorAll("button").forEach((button) => {
    const label = button.textContent.trim();

    if (label === "Edit" || label === "Edit Fee Structure") {
      button.addEventListener("click", () => {
        const scope = label === "Edit" ? button.closest("tr") : button.closest(".card");
        const isEditing = button.textContent.trim() === "Done";

        scope.querySelectorAll("td").forEach((cell) => {
          cell.contentEditable = String(!isEditing);
          cell.classList.toggle("editable-cell", !isEditing);
        });
        button.textContent = isEditing ? label : "Done";
        toast(isEditing ? "Changes saved." : "Edit the highlighted fields, then click Done.");
      });
    }

    if (label === "+ Add User") {
      button.addEventListener("click", () => {
        const name = prompt("User name:");
        const email = prompt("User email:");
        const role = prompt("User role:", "Teacher");
        if (!name || !email || !role) return;
        const row = document.createElement("tr");
        row.innerHTML = `<td>${name}</td><td>${email}</td><td>${role}</td><td><span class="badge ok">Active</span></td><td><button class="btn ghost" type="button">Edit</button></td>`;
        button.closest(".card").querySelector("tbody").appendChild(row);
        toast("User added.");
      });
    }
  });
};

const setupFees = () => {
  const paymentButton = Array.from(document.querySelectorAll("button")).find((button) => button.textContent.trim() === "Record Payment");
  if (!paymentButton) return;

  paymentButton.addEventListener("click", () => {
    const rows = Array.from(document.querySelectorAll("tbody tr"));
    const name = prompt("Student name:");
    const amount = moneyToNumber(prompt("Payment amount:"));
    const row = rows.find((item) => item.children[0]?.textContent.toLowerCase().includes((name || "").toLowerCase()));
    if (!row || !amount) {
      toast("Payment was not recorded.", "error");
      return;
    }

    const termFee = moneyToNumber(row.children[2].textContent);
    const paid = moneyToNumber(row.children[3].textContent) + amount;
    const balance = Math.max(termFee - paid, 0);
    row.children[3].textContent = formatMoney(paid);
    row.children[4].textContent = formatMoney(balance);
    row.children[5].innerHTML = balance === 0 ? '<span class="badge ok">Paid</span>' : '<span class="badge warn">Partial</span>';
    toast("Payment recorded.");
  });
};

const setupGrades = () => {
  const exportButton = Array.from(document.querySelectorAll("button")).find((button) => button.textContent.trim() === "Export Report");
  if (!exportButton) return;

  exportButton.addEventListener("click", () => {
    const rows = Array.from(document.querySelectorAll("table tr")).map((row) =>
      Array.from(row.children).map((cell) => `"${cell.textContent.trim()}"`).join(",")
    );
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "grades-report.csv";
    link.click();
    URL.revokeObjectURL(link.href);
    toast("Grades report exported.");
  });
};

const setupCalendar = () => {
  const addEvent = Array.from(document.querySelectorAll("button")).find((button) => button.textContent.trim() === "Add Event");
  if (!addEvent) return;

  addEvent.addEventListener("click", () => {
    const day = prompt("Day number:");
    const title = prompt("Event title:");
    const target = Array.from(document.querySelectorAll(".cal-day")).find((cell) => cell.querySelector(".date")?.textContent === day);
    if (!target || !title) {
      toast("Event was not added.", "error");
      return;
    }
    const event = document.createElement("span");
    event.className = "event";
    event.textContent = title;
    target.appendChild(event);
    toast("Event added.");
  });
};

const setupLogin = () => {
  const login = document.querySelector('a[href="darshboard.html"]');
  const form = login?.closest("form");
  if (!login || !form) return;

  document.querySelectorAll("[data-login-role]").forEach((button) => {
    button.addEventListener("click", () => {
      form.querySelector("#login-role").value = button.dataset.loginRole;
      form.querySelector('input[type="email"]').value = button.dataset.loginEmail;
      form.querySelector('input[type="password"]').value = button.dataset.loginPassword;
      toast(`${button.dataset.loginRole} login filled.`);
    });
  });

  login.addEventListener("click", (event) => {
    event.preventDefault();
    const email = form.querySelector('input[type="email"]');
    const password = form.querySelector('input[type="password"]');
    const role = form.querySelector("#login-role")?.value || "Admin";
    const account = credentials[role];
    const teacherAccount = role === "Teacher"
      ? teacherLoginAccounts.find((teacher) => teacher.email === email.value.trim() && teacher.password === password.value.trim())
      : null;
    const activeAccount = teacherAccount
      ? { ...teacherAccount, page: "teacher-portal.html" }
      : account;

    if (!email.value.trim() || !password.value.trim()) {
      (email.value.trim() ? password : email).focus();
      toast("Enter email and password to login.", "error");
      return;
    }

    if (!teacherAccount && (email.value.trim() !== account.email || password.value.trim() !== account.password)) {
      toast(`Invalid ${role} login details.`, "error");
      return;
    }

    sessionStorage.setItem("currentUser", JSON.stringify({
      role,
      email: activeAccount.email,
      name: activeAccount.name,
      teacherId: activeAccount.id,
      home: activeAccount.page,
    }));
    window.location.href = activeAccount.page;
  });
};

if (!setupAccessControl()) {
  throw new Error("Access denied");
}

setupSearch();
setupForms();
setupAttendance();
setupSettingsTabs();
setupTableActions();
setupFees();
setupGrades();
setupCalendar();
setupLogin();
